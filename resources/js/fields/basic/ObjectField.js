/*jshint -W004 */ // duplicate variables
/*jshint -W083 */ // inline functions are used safely
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.ObjectField = Alpaca.ContainerField.extend(
        /**
         * @lends Alpaca.Fields.ObjectField.prototype
         */
        {
        

            ///////////////////////////////////////////////////////////////////////////////////////////////////////
            //
            // WIZARD
            //
            ///////////////////////////////////////////////////////////////////////////////////////////////////////



            /**
             * Renders a template-based wizard.
             */
            wizard: function() {

                var _this = this;

                var element = this.outerEl;
                var steps = $('.alpaca-wizard-step', element);
                var count = steps.size();

                this.totalSteps = count;

                var stepTitles = [];
                if (this.wizardConfigs.stepTitles) {
                    stepTitles = this.wizardConfigs.stepTitles;
                } else {
                    // Prepare step titles
                    steps.each(function(i) {
                        var stepTitle = {
                            "title": "",
                            "description": ""
                        };
                        if ($('.alpaca-wizard-step-title', this)) {
                            stepTitle.title = $('.alpaca-wizard-step-title', this).html();
                            $('.alpaca-wizard-step-title', this).hide();
                        }
                        if ($('.alpaca-wizard-step-description', this)) {
                            stepTitle.description = $('.alpaca-wizard-step-description', this).html();
                            $('.alpaca-wizard-step-description', this).hide();
                        }
                        stepTitles.push(stepTitle);
                    });
                }
                var wizardStatusBarElement = this._renderWizardStatusBar(stepTitles);
                if (wizardStatusBarElement) {
                    $(element).before(wizardStatusBarElement);
                }

                steps.each(function(i) {

                    var wizardStepTargetId = $(this).attr("id");

                    var stepId = 'step' + i;
                    var wizardStepTemplateDescriptor = _this.view.getTemplateDescriptor("wizardStep");
                    if (wizardStepTemplateDescriptor) {
                        var wizardStepElement = _this.view.tmpl(wizardStepTemplateDescriptor, {});
                        wizardStepElement.attr("id", stepId);
                        $(this).wrap(wizardStepElement);
                    }

                    var navBarId = stepId + '-nav-bar';
                    var wizardNavBarTemplateDescriptor = _this.view.getTemplateDescriptor("wizardNavBar");
                    if (wizardNavBarTemplateDescriptor) {
                        var wizardNavBarElement = _this.view.tmpl(wizardNavBarTemplateDescriptor, {});
                        wizardNavBarElement.attr("id", navBarId);
                        wizardNavBarElement.addClass('alpaca-wizard-nav-bar');
                        $(this).append(wizardNavBarElement);
                    }

                    // collect all of the stepBindings for this step
                    var stepBindings = {};
                    var bindings = _this.view.getLayout().bindings;
                    for (var fieldId in bindings)
                    {
                        var bindingTargetId = bindings[fieldId];

                        if (bindingTargetId == wizardStepTargetId)
                        {
                            stepBindings[fieldId] = wizardStepTargetId;
                        }
                    }

                    var vFunc = function(stepCount, stepBindings)
                    {
                        return function() {

                            var valid = true;

                            if (_this.wizardConfigs && _this.wizardConfigs.validation) {

                                // if auto-wizard, process bindings one at a time
                                if (stepBindings) {
                                    $.each(stepBindings, function(propertyId, step) {
                                        valid = valid && _this.childrenByPropertyId[propertyId].validate(true);
                                        _this.childrenByPropertyId[propertyId].renderValidationState(true);
                                    });
                                }

                            }

                            return valid;
                        };
                    }(i, stepBindings);

                    if (i === 0) {
                        _this._createNextButton(i, true, vFunc);
                        _this._selectStep(i);
                    } else if (i == count - 1) {
                        $("#step" + i).hide();
                        _this._createPrevButton(i, false);
                        _this._createDoneButton(i, true, vFunc);
                    } else {
                        $("#step" + i).hide();
                        _this._createPrevButton(i, false);
                        _this._createNextButton(i, true, vFunc);
                    }
                });
            },

            /**
             * Renders a configuration-based wizard without a layout template.
             */
            autoWizard: function() {

                var _this = this;

                var totalSteps = this.wizardConfigs.steps;

                if (!totalSteps) {
                    totalSteps = 1;
                }

                this.totalSteps = totalSteps;

                var stepBindings = this.wizardConfigs.bindings;

                if (!stepBindings) {
                    stepBindings = {};
                }

                for (var propertyId in this.childrenByPropertyId) {
                    if (!stepBindings.hasOwnProperty(propertyId)) {
                        stepBindings[propertyId] = 1;
                    }
                }

                for (var i = 0; i < totalSteps; i++) {
                    var step = i + 1;
                    var tmpArray = [];
                    for (var propertyId in stepBindings) {
                        if (stepBindings[propertyId] == step) {
                            if (this.childrenByPropertyId && this.childrenByPropertyId[propertyId]) {
                                tmpArray.push("#" + this.childrenByPropertyId[propertyId].container.attr('id'));
                            }
                        }
                    }

                    var stepId = 'step' + i;
                    var wizardStepTemplateDescriptor = this.view.getTemplateDescriptor("wizardStep");
                    if (wizardStepTemplateDescriptor) {
                        var wizardStepElement = _this.view.tmpl(wizardStepTemplateDescriptor, {});
                        wizardStepElement.attr("id", stepId);
                        $(tmpArray.join(',')).wrapAll(wizardStepElement);
                    }

                    var navBarId = stepId + '-nav-bar';
                    var wizardNavBarTemplateDescriptor = this.view.getTemplateDescriptor("wizardNavBar");
                    if (wizardNavBarTemplateDescriptor) {
                        var wizardNavBarElement = _this.view.tmpl(wizardNavBarTemplateDescriptor, {});
                        wizardNavBarElement.attr("id", navBarId);
                        wizardNavBarElement.addClass('alpaca-wizard-nav-bar');
                        $('#' + stepId, this.outerEl).append(wizardNavBarElement);
                    }
                }

                var wizardStatusBarElement = this._renderWizardStatusBar(this.wizardConfigs.stepTitles);
                if (wizardStatusBarElement) {
                    wizardStatusBarElement.prependTo(this.fieldContainer);
                }

                for (var i = 0; i < totalSteps; i++) {

                    var vFunc = function(stepCount, stepBindings)
                    {
                        return function() {

                            var valid = true;

                            if (_this.view && _this.wizardConfigs && _this.wizardConfigs.validation) {

                                // if auto-wizard, process bindings one at a time
                                if (stepBindings) {
                                    $.each(stepBindings, function(propertyId, step) {
                                        if (step == stepCount + 1 && valid) {
                                            valid = valid && _this.childrenByPropertyId[propertyId].validate(true);
                                            _this.childrenByPropertyId[propertyId].renderValidationState(true);
                                        }
                                    });
                                }
                            }
                            
                            _this.hideWizardTabsForDependencies();

                            return valid;

                        };
                    }(i, stepBindings);


                    if (i === 0) {
                        _this._createNextButton(i, false, vFunc);
                        _this._selectStep(i);
                    } else if (i == totalSteps - 1) {
                        $("#step" + i).hide();
                        _this._createPrevButton(i, false);
                        _this._createDoneButton(i, true, vFunc);
                    } else {
                        $("#step" + i).hide();
                        _this._createPrevButton(i, false);
                        _this._createNextButton(i, false, vFunc);
                    }
                }
                
                _this.hideWizardTabsForDependencies();
            },

            /**
             * Renders wizard status bar.
             *
             * @param {Object} stepTitles Step titles.
             */
            _renderWizardStatusBar: function(stepTitles) {

                var _this = this;

                var wizardStatusBar = this.wizardConfigs.statusBar;
                if (wizardStatusBar && stepTitles) {
                    var wizardStatusBarTemplateDescriptor = this.view.getTemplateDescriptor("wizardStatusBar");
                    if (wizardStatusBarTemplateDescriptor) {
                        var wizardStatusBarElement = _this.view.tmpl(wizardStatusBarTemplateDescriptor, {
                            "id": this.getId() + "-wizard-status-bar",
                            "titles": stepTitles
                        });
                        wizardStatusBarElement.addClass("alpaca-wizard-status-bar");
                        this.getStyleInjection("wizardStatusBar",wizardStatusBarElement);
                        return wizardStatusBarElement;
                    }
                }
            },



            /**
             * Hide auto wizard tabs and panels based on dependencies defined in the stepTitles array
             * 
             * stepTitles: [
             *  {
             *     "title": "Primary Details"            
             *  }, 
             *  { 
             *     "title": "Organization Details",             
             *     "dependencies": {
             *       "investor_account_type": ['Corporation', 'Partnership', 'Non-Profit', 'Non-Incorporated Organization']
             *     }
             *   }
             * ] 
             * 
             * Automatically called on rendering of the wizard, and subsequently when 'Next' or 'Prev'
             * buttons are clicked.
             * 
             * Requires an additional CSS entry to make the 'hide' operate
             * li[data-hide-tab='true'], div[data-hide-tab='true'] {display:none !important;}
             * 
             * This function can also be called against the rendered_form, to allow reprocessing of 
             * dependencies to happen programmatically (for example, user events), for example:             
             *   
             * formEl.alpaca({
             *   postRender: function(rendered_form) {
             *     // other stuff
             *     $('someelement').click(function(){
             *       rendered_form.hideWizardTabsForDependencies();
             *     }); 
             *   }
             *   ...
             */
            hideWizardTabsForDependencies: function(){

              // Ensure we are in a wizard view before continuing
              var tc; 
              
              if(this.form)
                tc = this.form.topControl;    
              else if (this.view)
                tc = this;
              if(!tc.view.wizard){
                return false;
              }
              
              if(!tc.view.wizard){
                return false;
              }

              // Iterate through the wizard steps, identifying those that have dependencies
              // that are not satisfied
              var steps = tc.view.wizard.steps;
              for(var step_num=0; step_num < steps; step_num++){

                var wizopt = tc.view.wizard.stepTitles[step_num];
                var itemDependencies = wizopt.dependencies; 
                // Set the wizard panel and tab to be visible initially
                // We'll set the data-hide-tab attribute later if the tab is to be hidden      
                $('#stepDesc'+step_num).attr('data-hide-tab',null)
                $('#step'+step_num).attr('data-hide-tab', null);

                // Ignore processing if no dependencies on this step
                if(wizopt && itemDependencies){

                  var valid = true;

                  // Check each defined dependency is valid, by providing the wizard-defined dependencies
                  // and stepping though each 
                  // We are running this against the top control, which contains all fields
                  if (Alpaca.isString(itemDependencies))
                  {
                      valid = tc.determineSingleDependencyValid(null, itemDependencies, itemDependencies);
                  }
                  else if (Alpaca.isArray(itemDependencies))
                  {
                      $.each(itemDependencies, function(index, value) {
                          valid = valid &&  tc.determineSingleDependencyValid(null, value, itemDependencies);
                      });
                  }
                  else if (typeof itemDependencies === 'object' )
                  {
                      $.each(itemDependencies, function(index, value) {
                          valid = valid && tc.determineSingleDependencyValid(null, index, itemDependencies);
                      });                
                  }          


                  if(!valid){
                    // A CSS filter on the attribute will be used to hide the tab
                    // rather than explicity $().hide(), since this allows better control
                    // if tabs are hidden and shown programmatically outside of Alpaca
                    $('#stepDesc'+step_num).attr('data-hide-tab','true');
                    $('#step'+step_num).attr('data-hide-tab','true');
                  }        
                }
              }




            },

            /**
             * Creates an "prev" button.
             *
             * @param {Integer} i Step number.
             * @param [boolean] whether to add a clear div at the end
             * @param [validationFunction] function test whether the button should be allowed to proceed
             */
            _createPrevButton: function(i, clear, validationFunction) {

                // only apply validation if configured to do so
                if (this.wizardConfigs.buttons && this.wizardConfigs.buttons.prev) {
                    if (!this.wizardConfigs.buttons.prev.validateOnClick) {
                        validationFunction = null;
                    }
                }

                var stepName = "step" + i;
                var _this = this;

                var wizardPreButtonTemplateDescriptor = this.view.getTemplateDescriptor("wizardPreButton");
                if (wizardPreButtonTemplateDescriptor) {
                    var wizardPreButtonElement = _this.view.tmpl(wizardPreButtonTemplateDescriptor, {});
                    wizardPreButtonElement.attr("id", stepName + '-button-pre');
                    wizardPreButtonElement.addClass("alpaca-wizard-button-pre");
                    if (_this.buttonBeautifier) {
                        _this.buttonBeautifier.call(_this, wizardPreButtonElement, this.wizardPreIcon,true );
                    }

                    // when they click "prev", run validation function first to make sure they're allowed to proceed
                    wizardPreButtonElement.click(function(stepName, stepCount, validationFunction) {

                        return function() {
                            var valid = true;

                            if (validationFunction)
                            {
                                valid = validationFunction(stepName, stepCount);
                            }

                          _this.hideWizardTabsForDependencies();
                          
                            if (valid) {
                                $("#" + stepName).hide();
                                var next_i = i - 1;
                                while($("#step" + next_i).attr('data-hide-tab') && next_i > -1 ){ // limit just in case
                                  next_i--;
                                }
                                $("#step" + next_i).show();
                                _this._selectStep(next_i);
                                
                                // TODO: fire click handler?
                                if (_this.wizardConfigs.buttons.prev && _this.wizardConfigs.buttons.prev.onClick) {
                                    _this.wizardConfigs.buttons.prev.onClick();
                                }
                            }
                            return false;
                        };
                    }(stepName, i, validationFunction));

                    $("#" + stepName + "-nav-bar").append(wizardPreButtonElement);
                    if (clear) {
                        $("#" + stepName + "-nav-bar").parent().append("<div style='clear:both'></div>");
                    }
                }

            },

            /**
             * Creates a "next" button.
             *
             * @param {Integer} i Step number.
             * @param [boolean] whether to add a clear div at the end
             * @param [validationFunction] function test whether the button should be allowed to proceed
             */
            _createNextButton: function(i, clear, validationFunction) {

                // only apply validation if configured to do so
                if (this.wizardConfigs.buttons && this.wizardConfigs.buttons.next) {
                    if (!this.wizardConfigs.buttons.next.validateOnClick) {
                        validationFunction = null;
                    }
                }

                var stepName = "step" + i;
                var _this = this;

                var wizardNextButtonTemplateDescriptor = this.view.getTemplateDescriptor("wizardNextButton");
                if (wizardNextButtonTemplateDescriptor) {
                    var wizardNextButtonElement = _this.view.tmpl(wizardNextButtonTemplateDescriptor, {});
                    wizardNextButtonElement.attr("id", stepName + '-button-next');
                    wizardNextButtonElement.addClass("alpaca-wizard-button-next");
                    if (_this.buttonBeautifier) {
                        _this.buttonBeautifier.call(_this, wizardNextButtonElement, this.wizardNextIcon,true );
                    }

                    // when they click "next", run validation function first to make sure they're allowed to proceed
                    wizardNextButtonElement.click(function(stepName, stepCount, validationFunction) {

                        return function() {
                            var valid = true;

                            if (validationFunction)
                            {
                                valid = validationFunction(stepName, stepCount);
                            }
                            
                            _this.hideWizardTabsForDependencies();
                            
                            if (valid) {
                                $("#" + stepName).hide();
                                
                                var next_i = stepCount + 1;
                                while($("#step" + next_i).attr('data-hide-tab') && next_i < 1000 ){ // limit just in case
                                  next_i++;
                                }
                                  
                                
                                $("#step" + next_i).show();
                                _this._selectStep(next_i);

                                // TODO: fire click handler?
                                if (_this.wizardConfigs.buttons.next && _this.wizardConfigs.buttons.next.onClick) {
                                    _this.wizardConfigs.buttons.next.onClick();
                                }
                            }                            
                            return false;
                        };
                    }(stepName, i, validationFunction));

                    $("#" + stepName + "-nav-bar").append(wizardNextButtonElement);
                    if (clear) {
                        $("#" + stepName + "-nav-bar").parent().append("<div style='clear:both'></div>");
                    }
                }
            },

            /**
             * Creates a "done" button.
             *
             * @param {Integer} i Step number.
             * @param [boolean] whether to add a clear div at the end
             * @param [validationFunction] function test whether the button should be allowed to proceed
             */
            _createDoneButton: function(i, clear, validationFunction) {

                // only apply validation if configured to do so
                if (this.wizardConfigs.buttons && this.wizardConfigs.buttons.done) {
                    if (!this.wizardConfigs.buttons.done.validateOnClick) {
                        validationFunction = null;
                    }
                }

                var stepName = "step" + i;
                var _this = this;

                var wizardDoneButtonTemplateDescriptor = this.view.getTemplateDescriptor("wizardDoneButton");
                if (wizardDoneButtonTemplateDescriptor) {
                    var wizardDoneButtonElement = _this.view.tmpl(wizardDoneButtonTemplateDescriptor, {});
                    wizardDoneButtonElement.attr("id", stepName + '-button-done');
                    wizardDoneButtonElement.addClass("alpaca-wizard-button-done");
                    if (_this.buttonBeautifier) {
                        _this.buttonBeautifier.call(_this, wizardDoneButtonElement, this.wizardDoneIcon,true );
                    }

                    // when they click "done", run validation function first to make sure they're allowed to proceed
                    wizardDoneButtonElement.click(function(stepName, stepCount, validationFunction) {

                        return function() {
                            var valid = true;

                            if (validationFunction)
                            {
                                valid = validationFunction(stepName, stepCount);
                            }

                            if (valid) {
                                $("#" + stepName + "-nav-bar").append(wizardDoneButtonElement);
                                if (clear) {
                                    $("#" + stepName + "-nav-bar").parent().append("<div style='clear:both'></div>");
                                }

                                // TODO: fire click handler?
                                if (_this.wizardConfigs.buttons.done && _this.wizardConfigs.buttons.done.onClick) {
                                    _this.wizardConfigs.buttons.done.onClick();
                                }
                            }

                            return false;
                        };
                    }(stepName, i, validationFunction));

                    $("#" + stepName + "-nav-bar").append(wizardDoneButtonElement);
                    if (clear) {
                        $("#" + stepName + "-nav-bar").parent().append("<div style='clear:both'></div>");
                    }
                }

            },

            /**
             * Selects a wizard step.
             *
             * @param {Integer} i Step number.
             */
            _selectStep: function(i) {
                var unCurrentStepElem = $("#" + this.getId() + "-wizard-status-bar" + " li");
                unCurrentStepElem.removeClass("current current-has-next");
                this.getStyleInjection("wizardUnCurrentStep",unCurrentStepElem);
                var currentStepElem = $("#stepDesc" + i);
                currentStepElem.addClass("current");
                this.getStyleInjection("wizardCurrentStep",currentStepElem);
                if (i < this.totalSteps - 1) {
                    $("#stepDesc" + i).addClass("current-has-next");
                }
            },//__BUILDER_HELPERS

            /**
             * @private
             * @see Alpaca.ContainerField#getSchemaOfSchema
             */
            getSchemaOfSchema: function() {
                var properties = {
                    "properties": {
                        "properties": {
                            "title": "Properties",
                            "description": "List of child properties.",
                            "type": "object"
                        }
                    }
                };

                var fieldsProperties = properties.properties.properties;

                fieldsProperties.properties = {};

                if (this.children) {
                    for (var i = 0; i < this.children.length; i++) {
                        var propertyId = this.children[i].propertyId;
                        fieldsProperties.properties[propertyId] = this.children[i].getSchemaOfSchema();
                        fieldsProperties.properties[propertyId].title = propertyId + " :: " + fieldsProperties.properties[propertyId].title;
                    }
                }

                return Alpaca.merge(this.base(), properties);
            },

            /**
             * @private
             * @see Alpaca.ContainerField#getSchemaOfOptions
             */
            getSchemaOfOptions: function() {
                var schemaOfOptions = Alpaca.merge(this.base(), {
                    "properties": {
                    }
                });

                var properties = {
                    "properties": {
                        "fields": {
                            "title": "Field Options",
                            "description": "List of options for child fields.",
                            "type": "object"
                        }
                    }
                };

                var fieldsProperties = properties.properties.fields;

                fieldsProperties.properties = {};

                if (this.children) {
                    for (var i = 0; i < this.children.length; i++) {
                        var propertyId = this.children[i].propertyId;
                        fieldsProperties.properties[propertyId] = this.children[i].getSchemaOfOptions();
                        fieldsProperties.properties[propertyId].title = propertyId + " :: " + fieldsProperties.properties[propertyId].title;
                    }
                }

                return Alpaca.merge(schemaOfOptions, properties);
            },

            /**
             * @see Alpaca.Field#getTitle
             */
            getTitle: function() {
                return "Composite Field";
            },

            /**
             * @see Alpaca.Field#getDescription
             */
            getDescription: function() {
                return "Composite field for containing other fields";
            },

            /**
             * @see Alpaca.Field#getType
             */
            getType: function() {
                return "object";
            },

            /**
             * @see Alpaca.Field#getFieldType
             */
            getFieldType: function() {
                return "object";
            }//__END_OF_BUILDER_HELPERS

        });

    Alpaca.registerFieldClass("object", Alpaca.Fields.ObjectField);
    Alpaca.registerDefaultSchemaFieldMapping("object", "object");
})(jQuery);
