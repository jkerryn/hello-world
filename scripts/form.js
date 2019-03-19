/**
 * Form script containing data, schema, and options objects
 */
$(document).ready(function() {

  $("#intro").alpaca({
    "data": {
      "role": "-- Select --",
    },
    "schema": {
      "type": "object",
      "properties": {
        "role": {
          "type": "string",
          "title": "Please select your role:",
          "enum": ["Project Manager", "Asset Manager", "Regional Planning Commission"],
          "required":true
        }
      }
    },
    "options": {
      "hideInitValidationError": true,
      "fields": {
        "role": {
          "type": "select",
          "optionLabels": ["Project Manager", "Asset Manager", "Regional Planning Commission"],
          "id": "title",
          "hideNone": true,
        }
      },
      "form": {
        "buttons": {
          "submit": {
            "title": "Next",
            "click": function(e) {
              var role = this.getValue();
              $("div#intro").hide();
              if (role.role == "Project Manager") {
                $("div#wizardPM").show();
                $("div#wizardAM").hide();
                $("div#wizardRPC").hide();
                console.log("Project Manager");
                wizardPM();
              }
              else if (role.role == "Asset Manager") {
                $("div#wizardAM").show();
                $("div#wizardPM").hide();
                $("div#wizardRPC").hide();
                console.log("Asset Manager");
                wizardAM();
              }
              else if (role.role == "Regional Planning Commission") {
                $("div#wizardRPC").show();
                $("div#wizardPM").hide();
                $("div#wizardAM").hide();
                console.log("Regional Planning Commission");
                wizardRPC();
              }
            }
          }
        }
      }
    },
  });

  

  /**
   * Initial data
   */

  var rpcData = {
    "PIN": "",
    "bicycleConnectivity": "-- Select --",
    "bicycleCorridor": "-- Select --",
    "pedestrianConnectivity": "-- Select --",
    "growthAreaState": "-- Select --",
    "growthAreaRPC": "-- Select --",
    "transitConnectivity": "-- Select --",
    "transInfraImprovements": "-- Select --",
    "transRoute": "-- Select --",
    "intermodalConnectivity": "-- Select --",
    "parknride": "-- Select --",
    "trainStation": "-- Select --",
    "railyard": "-- Select --",
    "busStation": "-- Select --",
    "longTermVision": "-- Select --",
    "shortTermVision": "-- Select --",
    "senseOfCommunity": "-- Select --",
    "communityAccess": "-- Select --",
    "healthCare": "-- Select --",
    "healthFood": "-- Select --",
    "physicalActivity": "-- Select --"
  };

  var rpcSchema = {
    "type": "object",
    "displayReadonly": true,
    "properties": {
      "PIN": {
        "type": "string",
        "title": "Enter your project identification number (PIN).",
        "required": true,
        "maxLength": 6,
        "minLength": 6
      },
      "bicycleConnectivity": {
        "type": "string",
        "title": "Does this highway project enhance or improve connectivity for bicyclists?",
        "enum": ["Yes", "No"],
        "required": true
      },
      "bicycleCorridor": {
        "type": "string",
        "title": "Is the project located on a 'Highway Priority' bicycle corridor?",
        "enum": ["Yes", "No"]
      },
      "pedestrianConnectivity": {
        "type": "string",
        "title": "Does this highway project enhance or improve connectivity for pedestrians?",
        "enum": ["Yes", "No"],
        "required": true
      },
      "growthAreaState": {
        "type": "string",
        "title": "Is the project located completely or partially within a 'State Designated Growth Area'?",
        "enum": ["Yes", "No"]
      },
      "growthAreaRPC": {
        "type": "string",
        "title": "Is the project located completely or partially within an area that the Regional Planning Commission recognizes as a 'Growth Area'?",
        "enum": ["Yes", "No"]
      },
      "transitConnectivity": {
        "type": "string",
        "title": "Does this highway project enhance or improve connectivity for transit users?",
        "enum": ["Yes", "No"],
        "required": true
      },
      "transInfraImprovements": {
        "type": "string",
        "title": "Does the project incorporate trasnit infrastructure improvements?",
        "enum": ["Yes", "No"]
      },
      "transRoute": {
        "type": "string",
        "title": "Is the project within an existing transit route or does it connect to an existing transit route?",
        "enum": ["Yes", "No"]
      },
      "intermodalConnectivity": {
        "type": "string",
        "title": "Does this highway project enhance or improve inter-modal connections (e.g., park-n-rides, train stations, bus stations)?",
        "enum": ["Yes", "No"],
        "required": true
      },
      "parknride": {
        "type": "string",
        "title": "Does this project connect (i.e., provide direct access) to a park-n-ride?",
        "enum": ["Yes", "No"]
      },
      "trainStation": {
        "type": "string",
        "title": "Does this project connect (i.e., provide direct access) to a train station?",
        "enum": ["Yes", "No"]
      },
      "railyard": {
        "type": "string",
        "title": "Does this project connect (i.e., provide direct access) to a railyard?",
        "enum": ["Yes", "No"]
      },
      "busStation": {
        "type": "string",
        "title": "Does this project connect (i.e., provide direct access) to a bus station?",
        "enum": ["Yes", "No"]
      },
      "longTermVision": {
        "type": "string",
        "title": "Is the project or the driving need for the project identified in a VTrans corridor, town, city, regional, etc plan?",
        "enum": ["Yes", "No"]
      },
      "shortTermVision": {
        "type": "string",
        "title": "Has the town been involved in (selectboard approval?? - no selectboard approval = no points!, letter of support???, short term planning study, how does the municipality demonstrated support this project?) a planning (scoping, traffic or feasibility)  study  or public planning process related to this need/project? Or has it demonstrated support for this project in other ways?",
        "enum": ["Yes", "No"]
      },
      "senseOfCommunity": {
        "type": "string",
        "title": "Will this project improve the Town's sense of community (provide for public space - ie waterbury roundabout not the garden in the mddle) - space to gather, park enhancements, etc, traffic calming, trees, lighting, enhancements, gateway, historic preservation)? Does this project provide opportunities for residents to connect to community resources?",
        "enum": ["Yes", "No"]
      },
      "communityAccess": {
        "type": "string",
        "title": "Are there key community facilities located within the limits of the project (schools, senior centers, parks, churches, libraries, municipal bldgs)?",
        "enum": ["Yes", "No"]
      },
      "improvementInstructions": {
        "type": "string",
        "title": "Low Improvement",
        "readonly": true
      },
      "healthCare": {
        "type": "string",
        "title": "If a highways project is enhancing or improving health access to health care facilities or physical activity facility (senior center, park, trails, school with community recreational program), but not private gyms, determine the level of improvement using the guide above.",
        "enum": ["No Improvement", "Low Improvement", "High Improvement"],
        "required": true
      },
      "healthFood": {
        "type": "string",
        "title": "If a highways project is enhancing or improving health access to healthy food destinations (grocery store, health food store, food shelf, school lunch program, low income meals programs) (Not convenience stores or restaurants) determine the level of improvement using the guide above.",
        "enum": ["No Improvement", "Low Improvement", "High Improvement"],
        "required": true
      },
      "physicalActivity": {
        "type": "string",
        "title": "If a highways project is increasing the opportunity for physical activity determine the level of improvement using the guide above.",
        "enum": ["No Improvement", "Low Improvement", "High Improvement"],
        "required": true
      }
    },
    "dependencies": {
      "bicycleCorridor": ["bicycleConnectivity"],
      "growthAreaState": ["pedestrianConnectivity"],
      "growthAreaRPC": ["pedestrianConnectivity"],
      "transInfraImprovements": ["transitConnectivity"],
      "transRoute": ["transitConnectivity"],
      "parknride": ["intermodalConnectivity"],
      "trainStation": ["intermodalConnectivity"],
      "railyard": ["intermodalConnectivity"],
      "busStation": ["intermodalConnectivity"]
    }
  };

  var rpcOptions = {
    "type": "object",
    "hideInitValidationError": true,
    "fields": {
      "PIN": {
        "type": "text",
        "placeholder": "eg.P1N",
        "constrainMaxLength": true,
        "constrainMinLength": true
      },
      "bicycleConnectivity": {
        "type": "select",
        "optionLabels": ["Yes", "No"]
      },
      "bicycleCorridor": {
        "dependencies": {
          "bicycleConnectivity": ["Yes"]
        },
        "type": "radio",
        "optionLabels": ["Yes", "No"],
        "validate": "false",
        "hideNone": true
      },
      "pedestrianConnectivity": {
        "type": "select",
        "optionLabels": ["Yes", "No"]
      },
      "growthAreaState": {
        "dependencies": {
          "pedestrianConnectivity": ["Yes"]
        },
        "type": "radio",
        "optionLabels": ["Yes", "No"],
        "validate": "false",
        "hideNone": true
      },
      "growthAreaRPC": {
        "dependencies": {
          "pedestrianConnectivity": ["No"]
        },
        "type": "radio",
        "optionLabels": ["Yes", "No"],
        "validate": "false",
        "hideNone": true
      },
      "transitConnectivity": {
        "type": "select",
        "optionLabels": ["Yes", "No"]
      },
      "transInfraImprovements": {
        "dependencies": {
          "transitConnectivity": ["Yes"]
        },
        "type": "radio",
        "optionLabels": ["Yes", "No"],
        "validate": "false",
        "hideNone": true
      },
      "transRoute": {
        "dependencies": {
          "transitConnectivity": ["Yes"]
        },
        "type": "radio",
        "optionLabels": ["Yes", "No"],
        "validate": "false",
        "hideNone": true
      },
      "intermodalConnectivity": {
        "type": "select",
        "optionLabels": ["Yes", "No"]
      },
      "parknride": {
        "dependencies": {
          "intermodalConnectivity": ["Yes"]
        },
        "type": "radio",
        "optionLabels": ["Yes", "No"],
        "validate": "false",
        "hideNone": true
      },
      "trainStation": {
        "dependencies": {
          "intermodalConnectivity": ["Yes"]
        },
        "type": "radio",
        "optionLabels": ["Yes", "No"],
        "validate": "false",
        "hideNone": true
      },
      "railyard": {
        "dependencies": {
          "intermodalConnectivity": ["Yes"]
        },
        "type": "radio",
        "optionLabels": ["Yes", "No"],
        "validate": "false",
        "hideNone": true
      },
      "busStation": {
        "dependencies": {
          "intermodalConnectivity": ["Yes"]
        },
        "type": "radio",
        "optionLabels": ["Yes", "No"],
        "validate": "false",
        "hideNone": true
      },
      "longTermVision": {
        "type": "select",
        "optionLabels": ["Yes", "No"],
        "hideNone": true
      },
      "shortTermVision": {
        "type": "select",
        "optionLabels": ["Yes", "No"],
        "hideNone": true
      },
      "senseOfCommunity": {
        "type": "select",
        "optionLabels": ["Yes", "No"],
        "hideNone": true
      },
      "communityAccess": {
        "type": "select",
        "optionLabels": ["Yes", "No"],
        "hideNone": true
      },
      "improvementInstructions": {
        "type": "text",
        "id": "instr",
        "label": "In this section you are provided with three health access descriptions and asked to rank your project based on improvement to those descriptions (No Improvement, Low Improvement, High Improvement). Low Improvement projects include upgrades to one or more of the following existing infrastructure; sidewalks, crosswalks, shoulders, bus stop and signals. High Improvement projects include new construction of one or more of the following; new sidewalks, crosswalk, shoulders, ADA intersection upgrades, new bus stop, intersection upgrades including the addition of pedestrian phases, and new transit routes.",
        "fieldClass": "instructions"
      },
      "healthCare": {
        "type": "select",
        "optionLabels": ["No Improvement", "Low Improvement", "High Improvement"],
        "hideNone": true
      },
      "healthFood": {
        "type": "select",
        "optionLabels": ["No Improvement", "Low Improvement", "High Improvement"],
        "hideNone": true
      },
      "physicalActivity": {
        "type": "select",
        "optionLabels": ["No Improvement", "Low Improvement", "High Improvement"],
        "hideNone": true
      }
    }
  };

  var amData = {
    "PIN": "",
    "schedRecon": "-- Select --",
    "schedPrev": "-- Select --"
  };

  var amSchema = {
  	"type": "object",
    "displayReadonly": true,
    "properties": {
      "PIN": {
        "type": "string",
        "title": "Enter your project identification number (PIN).",
        "required": true,
        "maxLength": 6,
        "minLength": 6
      },
  		"rightTime": {
        "type": "string",
        "title": "Is the time right? We don't want to invest too early. How many years is the scheduled treatment from the optimal treatment time?",
        "readonly": true
      },
      "schedRecon": {
        "type": "string",
        "title": "Is the scheduled reconstruction or hehabilitation less than or equal to 5 years from the optimal treatment time?",
        "enum": ["Yes", "No", "Not Applicable"],
        "required": true
      },
      "schedPrev": {
        "type": "string",
        "title": "Is the scheduled preventative maintenance less than or equal to 3 years from the optimal treatment time?",
        "enum": ["Yes", "No", "Not Applicable"],
        "required": true
      }
    }
  };

  var amOptions = {
  	"type": "object",
    "hideInitValidationError": true,
    "fields": {
      "PIN": {
        "type": "text",
        "placeholder": "eg.P1N",
        "constrainMaxLength": true,
        "constrainMinLength": true
      },
	  	"rightTime": {
	      "type": "text",
        "id": "instr",
        "label": "Is the time right? We don't want to invest too early. How many years is the scheduled treatment from the optimal treatment time?",
        "fieldClass": "instructions"
	    },
      "schedRecon": {
        "type": "select",
        "optionLabels": ["Yes", "No", "Not Applicable"],
        "hideNone": true
      },
      "schedPrev": {
        "type": "select",
        "optionLabels": ["Yes", "No", "Not Applicable"],
        "hideNone": true
      }
  	}
  };


  var pmData = {
    "PIN": "",
    "existingShoulderWidth": "-- Select --",
    "proposedShoulderWidth": "-- Select --",
    "numberOfIntersections": "-- Select --",
    "intersectionsGeometryTable": [],
    "roadwayCrashes": [{
      "feature": "Roadway",
      "attributes": [{
          "crashType": "Fatal [K]",
          "count": ""
        }, {
          "crashType": "Disabling Injury [A]",
          "count": ""
        }, {
          "crashType": "Evident Injury [B]",
          "count": ""
        }, {
          "crashType": "Possible Injury [C]",
          "count": ""
        }, {
          "crashType": "Property Damage Only [O]",
          "count": ""
        }]
      }
    ],
    "intersectionsTable": [],
    "roadwayReductionFactors": [{
      "feature": "Roadway",
      "attributes": [{
          "factor": "1",
          "factorType": "None"
        }, {
          "factor": "2",
          "factorType": "None"
        }, {
          "factor": "3",
          "factorType": "None"
        }]
      }
    ],
    "intersectionsReductionsFactorsTable": [],
    "csl": "-- Select --",
    "new": "-- Select --",
    "thisProject": "-- Select --",
    "preLoS": "-- Select --",
    "postLoS": "-- Select --",
    "criticality": false,
    "vulnerabilityDesc": "-- Select --",
    "longTermVision": "-- Select --",
    "wildlife": [{
          "description": "Larger structure, or wildlife shelf or substrate on structures to provide safe and efficeint terrestrial wildlife or aquatic organism passage",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Purchase of easements to conserve critical linkage areas adjacent to VTrans infrastructure",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Passage structures (permeability) whose primary function is solely for wildlife passage",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Exclusionary measures….wildlife barriers (salamander wall, turtle curbs) to keep animals off the highway",
         "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Advisory signage for motorists (in high mortality areas, flashing lights)",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Removal of existing barriers to wildlife movement such as breaks in guardrail at critical areas",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "(nonrequired) Studies or monitoring of potential crossing areas or wildlife populations in proximity to a VTrans project (eg Waterbury-Bolton wildlife study)",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Habitat features (bat boxes, bird boxes, peregrine falcon nesting areas, turtle basking platforms, etc) on structures or in VTrans ROW",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Landscape or pollinator plantings to support wildlife habitat and movement",
          "requiredMit": false,
          "voluntaryMit": false
      }
    ],
    "airQuality": [{
        "description": "EV charging stations",
        "requiredMit": false,
        "voluntaryMit": false
      }, {
        "description": "VHT or VMT Reductions  [signal upgrades that reduce congestion = LOW] - what value or threshhold for low vs high",
        "requiredMit": false,
        "voluntaryMit": false
      }, {
        "description": "VHT or VMT Reductions - what value or threshhold for [HIGH]",
        "requiredMit": false,
        "voluntaryMit": false
      }
    ],
    "waterQuality": [{
          "description": "Eliminates direct discharges of untreated runoff to surface waters (promotes overland sheet flow through vegetation or infiltration)",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Installation of stormwater treatment features beyond treating new impervious",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Gains credit towards TMDL load allocations (P in Lake Champlain or Flow in SW impaired waters)",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Addresses one or more noted concerns in community stormwater master plan or tactical basin plan",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Restores predevelopment hydrology or significantly reduces impervious footprint (>= 10%)",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Addresses existing erosion issue (stabilizes gullies/outfalls)",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Prevents future erosion (slows velocity) , i.e. permenant stone check dams, adding stone, larger culvert = slower velocities",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Reduces chloride application need (i.e., reduced footprint,  ) and thus groundwater impacts in critical source areas (chloride impaired waterways)",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Increases floodplain access (may be more resiliency but can help)",
          "requiredMit": false,
          "voluntaryMit": false
      }
    ],
    "culturalResources": [{
          "description": "Adaptive re-use of historic truss bridge",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Repairing historic bridges rather than replacing",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Relocate historic barns or other structures away from roadside",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Pay for National Register nominations",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Pay for Historic Context Study",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Addresses existing erosion issue (stabilizes gullies/outfalls)",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Signage",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Easements – collaboration with extrenal stakeholders (i.e., NGO partners such as Preservation Trust of Vermont ) to preserve cultural resources",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Adaptive re-use of historic buildings to preservation standards (e.g., Vergennes Train Depot into visitor center)",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Local and context specific materials (stone and wood)",
          "requiredMit": false,
          "voluntaryMit": false
      }, {
          "description": "Creative and aesthetic elements that reflect cultural heritage (i.e., historic bridge railings, lights, i.e., Willimantic Frog Bridge, CT and public design 'bee'",
          "requiredMit": false,
          "voluntaryMit": false
      }
    ],
    "shortTermVision": "-- Select --",
    "senseOfCommunity": "-- Select --",
    "facilities": "-- Select --",
    "healthCare": "-- Select --",
    "healthFood": "-- Select --",
    "physicalActivity": "-- Select --"
  };

  /**
   * JSON-schema for the form
   *
   * The form schema defines the data types, validation logic and other constraints that need to be satisfied in
   * order for the form to be considered valid.
   */

  var pmSchema = {
    "type": "object",
    "displayReadonly": true,
    "properties": {
      "PIN": {
        "type": "string",
        "title": "Enter your project identification number (PIN).",
        "required": true,
        "maxLength": 6,
        "minLength": 6
      },
      "projectLength": {
        "type": "number",
        "title": "What is the length of the project (miles)?",
        "required": true
      },
      "projectCost": {
        "type": "number",
        "title": "What is the cost of the project (dollars)?",
        "required": true
      },
      "averageAADT": {
        "type": "number",
        "title": "What is the annual average daily traffic (AADT, vehicles/day)?",
        "required": true
      },
      "existingShoulderWidth": {
        "type": "string",
        "title": "What is the existing shoulder width (ft)?",
        "enum": ["0", "2", "4", "6", "8"],
        "required": true
      },
      "proposedShoulderWidth": {
        "type": "string",
        "title": "What is the proposed shoulder width (ft)?",
        "enum": ["0", "2", "4", "6", "8"],
        "required": true
      },
      "numberOfIntersections": {
        "title": "How many intersections are associated with the project?",
        "enum": ["0", "1", "2", "3", "4"],
        "required": true,
        "default": 0
      },
      "intersectionsGeometryTable": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "feature": {
              "type": "string",
              "readonly": true
            },
            "attributes": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "skewAngle": {
                    "type": "string",
                    "readonly": true
                  },
                  "degree": {
                    "type": "number",
                    "required": true,
                  }
                }
              }
            }
          }
        } 
      },
      "roadwayCrashes": {
        "title": "In the table(s) below, please enter crash information for the roadway and any intersections denoted previously:",
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "feature": {
              "type": "string"
            },
            "attributes": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "crashType": {
                    "type": "string"
                  },
                  "count": {
                    "type": "number",
                    "required": true
                  }
                }
              }
            }
          }
        } 
      },
      "intersectionsTable": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "feature": {
              "type": "string",
              "readonly": true
            },
            "attributes": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "crashType": {
                    "type": "string",
                    "readonly": true
                  },
                  "count": {
                    "type": "number",
                    "required": true,
                  }
                }
              }
            }
          }
        } 
      },
      "roadwayReductionFactors": {
        "title": "In the table(s) below, please enter crash reduction factors for the roadway and any intersections denoted previously (select up to 3):",
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "feature": {
              "type": "string"
            },
            "attributes": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "factor": {
                    "type": "string"
                  },
                  "factorType": {
                  	"type": "string",
                    "enum": ["None",
                             "Raise Median - Two Lane - Urban",
                        		 "Raise Median - Multi Lanes - Urban",
                        		 "Raise Median - Multi Lanes - Rural",
                        		 "Provide Lighting",
                        		 "Install Centerline Rumble Strips - Two lane - Rural",
                        		 "Increase Shoulder Width"]
                  }
                }
              }
            }
          }
        } 
      },
      "intersectionsReductionsFactorsTable": {
        "title": "",
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "feature": {
              "type": "string"
            },
            "attributes": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "factor": {
                    "type": "string"
                  },
                  "factorType": {
                  	"type": "string",
                    "enum": ["None",
                             "Convert Stop Controlled Intersection to Roundabout- One Lane - Rural",
				        			       "Convert Stop Controlled Intersection to Roundabout- One Lane - Urban",
				        			       "Convert Stop Controlled Intersection to Roundabout- Two Lanes - Suburban",
				        			       "Convert Minor Stop to All-Way Stop - Rural",
				        			       "Convert Stop Control to Signal - 3 or 4 legs - Rural",
				        			       "Convert Stop Control to Signal - 4 legs - Urban",
				        			       "Change Intersection Skew Angle - 3 legs - Rural",
                    	       "Change Intersection Skew Angle - 4 legs - Rural",
                    		 		 "Provide Left Turn Lane on one Approach - 3 legs, stop controlled - Rural",
                    		 		 "Provide Left Turn Lane on one Approach - 4 legs, stop controlled - Rural",
                    		 		 "Provide Left Turn Lane on one Approach - 4 legs, stop controlled - Urban",
                    		 		 "Provide Left Turn Lane on one Approach - 4 legs, signalized controlled - Urban",
                    		 		 "Provide Lighting"]
                  }
                }
              }
            }
          }
        } 
      },
      "csl": {
        "type": "string",
        "title": "Identify the Customer Service Level of the roadway.",
        "enum": ["CSL1 - NHS - Interstate", "CSL2 - NHS - Non-Interstate", "CSL3 - Regional Corridors", "CSL4 - Local Connectors", "CSL5 - Class 1 THs", "CSL6 - Class 2 and 3 THs"],
        "required": true
      },
      "new": {
        "type": "string",
        "title": "Is this a new asset or a new capacity project (e.g, adding a lane for roadway or adding a lane for a bridge that adds capacity or increases the physical amount or volume of an asset)?",
        "enum": ["Yes", "No", "Not Applicable"],
        "required": true
      },
      "thisProject": {
        "type": "string",
        "title": "This project ____________ the primary asset(s)",
        "enum": ["replaces", "rehabilitates", "performs preventative maintenance on"],
        "required": true
      },
      
      "preLoS": {
        "type": "string",
        "title": "What is the current level of service (LOS) for the intersection or roadway where the project is going to be performed?",
        "enum": ["LOS A/B", "LOS C", "LOS D", "LOS E", "LOS F"],
        "required": true
      },
      "postLoS": {
        "type": "string",
        "title": "What is the design level of service (LOS) for the intersection or roadway after the project improvements have been completed?",
        "enum": ["LOS A/B", "LOS C", "LOS D", "LOS E", "LOS F"],
        "required": true
      },
      "placeholder": {
        "type": "string",
        "title": "Economic Access Factor is under development.",
        "required": false
      },
      "nri": {
        "type": "number",
        "title": "Enter Network Robustness Index (NRI) percentile value:",
        "minimum": 0,
        "maximum": 100,
        "minLength": 1,
        "maxLength": 3,
        "required": true
      },
      "cca": {
        "type": "number",
        "title": "Enter Critical Closeness Accessibility (CCA) percentile value:",
        "minimum": 0,
        "maximum": 100,
        "minLength": 1,
        "maxLength": 3,
        "required": true
      },
      // "criticality": {
      //   "type": "string",
      //   "title": "Check this box if the primary assets are deemed critical for reasons other than those based on NRI or CCA values." 
      // },
      // "criticalityReasons": {
      //   "type": "string",
      //   "title": "List reasons why the primary assets are deemed critical beyond the NRI and CCA values.",
      //   "required": true
      // },
      "vulnerabilityDesc": {
        "type": "string",
        "title": "Select the description that best describes the vulnerability of the primary asset(s) within the project limits.",
        "enum": [
                "One or more major weaknesses have been identified. The asset is highly susceptible to extreme events.The asset lacks redundancy or physical protections. The asset would not be functional for a very long period of time after the event.",
                "One or more major weaknesses have been identified. The asset is highly susceptible to extreme events.The asset has a poor level of redundancy or physical protections.The asset would not be functional for a long period of time after the event.",
                "One or more significant weaknesses have been identified. The asset is very susceptible to extreme events.The asset has a poor level of redundancy or physical protections.The asset would not be functional for a moderate period of time after the event.",
                "One or more significant weaknesses have been identified. The asset is susceptible to extreme events.The asset has a fair level of redundancy or physical protections.The asset would not be functional for a moderate period of time after the event.",
                "One or more minor weaknesses have been identified. The asset is susceptible to extreme events.The asset has a fair level of redundancy or physical protections.The asset would not be functional for a short period of time after the event.",
                "A minor weakness has been identified. The asset is somewhat susceptibile to extreme events.The asset has a good level of redundancy or physical protections.The asset would be not be functional for a short period of time after an event.",
                "A minor weakness has been identified. The asset is somewhat susceptibile to extreme events.The asset has excellent redundancy or physical protections.The asset would not be functional immediately after an event.",
                "No weaknesses exist. The asset is not vulnerable to extreme events. The asset has incorporated excellent redundancy or physical protections.The asset would be operational immediately after the event."
        ],
        "required": true
      },
      "wildlife": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "description": {
              "type": "string",
              "readonly": true
            },
            "requiredMit": {
              "type": "boolean"
            },
            "voluntaryMit": {
              "type": "boolean"
            }
          }
        }
      },
      "airQuality": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "description": {
              "type": "string",
              "readonly": true
            },
            "requiredMit": {
              "type": "boolean"
            },
            "voluntaryMit": {
              "type": "boolean"
            }
          }
        }
      },
      "waterQuality": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "description": {
              "type": "string",
              "readonly": true
            },
            "requiredMit": {
              "type": "boolean"
            },
            "voluntaryMit": {
              "type": "boolean"
            }
          }
        }
      },
      "culturalResources": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "description": {
              "type": "string",
              "readonly": true
            },
            "requiredMit": {
              "type": "boolean"
            },
            "voluntaryMit": {
              "type": "boolean"
            }
          }
        }
      },
      // "longTermVision": {
      //   "type": "string",
      //   "title": "Is the project or the driving need for the project identified in a VTrans corridor, town, city, regional, etc plan?",
      //   "enum": ["Yes", "No"],
      //   "required": true
      // },
      // "shortTermVision": {
      //   "type": "string",
      //   "title": "Has the town been involved in (selectboard approval?? - no selectboard approval = no points!, letter of support???, short term planning study, how does the municipality demonstrated support this project?) a planning (scoping, traffic or feasibility)  study  or public planning process related to this need/project? Or has it demonstrated support for this project in other ways?",
      //   "enum": ["Yes", "No"],
      //   "required": true
      // },
      // "senseOfCommunity": {
      //   "type": "string",
      //   "title": "Will this project improve the Town's sense of community (provide for public space - e.g., waterbury roundabout not the garden in the middle) - space to gather, park enhancements, etc, traffic calming, trees, lighting, enhancements, gateway, historic preservation)? Does this project provide opportunities for residents to connect to community resources?",
      //   "enum": ["Yes", "No"],
      //   "required": true
      // },
      // "facilities": {
      //   "type": "string",
      //   "title": " Are there key community facilities located within the limits of the project (schools, senior centers, parks, churches, libraries, municipal bldgs)?",
      //   "enum": ["Yes", "No"],
      //   "required": true
      // },
      // "improvementInstructions": {
      //   "type": "string",
      //   "title": "Low Improvement",
      //   "readonly": true
      // },
      // "healthCare": {
      //   "type": "string",
      //   "title": "If a highways project is enhancing or improving health access to health care facilities or physical activity facility (senior center, park, trails, school with community recreational program), but not private gyms, determine the level of improvement using the guide above.",
      //   "enum": ["No Improvement", "Low Improvement", "High Improvement"],
      //   "required": true
      // },
      // "healthFood": {
      //   "type": "string",
      //   "title": "If a highways project is enhancing or improving health access to healthy food destinations (grocery store, health food store, food shelf, school lunch program, low income meals programs) (Not convenience stores or restaurants) determine the level of improvement using the guide above.",
      //   "enum": ["No Improvement", "Low Improvement", "High Improvement"],
      //   "required": true
      // },
      // "physicalActivity": {
      //   "type": "string",
      //   "title": "If a highways project is increasing the opportunity for physical activity determine the level of improvement using the guide above.",
      //   "enum": ["No Improvement", "Low Improvement", "High Improvement"],
      //   "required": true
      // }
    },
    "dependencies": {
      "thisProject": ["new"],
      //"rightTime": ["new"],
      "criticalityReasons": ["criticality"]
    }
  };

  /**
   * Layout options for the form
   */

  var pmOptions = {
    "type": "object",
    "hideInitValidationError": true,
    "fields": {
      "PIN": {
        "type": "text",
        "placeholder": "eg.P1N",
        "constrainMaxLength": true,
        "constrainMinLength": true
      },
      "projectLength": {
        "type": "number",
        "numericEntry": true
      },
      "projectCost": {
        "type": "number",
        "numericEntry": true,
        "helper": "Keep project costs updated at every major project delivery milestone or whenever the scope changes substantially.Use the best information available. Project Costs include all project related costs - Scoping, ROW, PE, Construction."
      },
      "averageAADT": {
        "type": "number",
        "numericEntry": true
      },
      "existingShoulderWidth": {
        "type": "select",
        "helper": "if in between, be conservative and round down, if greater than 8 ft, enter 8 ft",
        "optionLabels": ["0", "2", "4", "6", "8"]
      },
      "proposedShoulderWidth": {
        "type": "select",
        "helper": "if in between, be conservative and round down, if greater than 8 ft, enter 8 ft",
        "optionLabels": ["0", "2", "4", "6", "8"]
      },
      "numberOfIntersections": {
        "id": "numberOfIntersections",
        "type": "select",
        "optionLabels": ["0", "1", "2", "3", "4"]
      },
      "intersectionsGeometryTable": {
        "type": "table",
        "id": "intersectionsGeometryTable",
        "animate": true,
        "hideNone": true,
        "label": "",
        "showActionsColumn": false,
        "items": {
          "fields": {
            "feature": {
              "type": "text",
              "label": ""
            },
            "attributes": {
              "type": "table",
              "label": "",
              "items": {
                "fields": {
                  "skewAngle": {
                    "type": "text",
                    "label": "Skew Angle"
                  },
                  "degree": {
                    "type": "number",
                    "label": "Degrees",
                    "numericEntry": true
                  }
                }
              },
              "showActionsColumn": false,
              "toolbarSticky": false,
              "hideToolbarWithChildren": true,
              "hideToolbar": true
            }
          }
        }
      },
      "roadwayCrashes": {
        "type": "table",
        "animate": true,
        "hideNone": true,
        "showActionsColumn": false,
        "items": {
          "fields": {
            "feature": {
              "type": "text",
              "label": "",
              "readonly": true
            },
            "attributes": {
              "type": "table",
              "label": "",
              "items": {
                "fields": {
                  "crashType": {
                    "type": "text",
                    "label": "Crash Type",
                    "readonly": true
                  },
                  "count": {
                    "type": "number",
                    "label": "Count",
                    "numericEntry": true
                  }
                }
              },
              "showActionsColumn": false,
              "toolbarSticky": false,
              "hideToolbarWithChildren": true,
              "hideToolbar": true
            }
          }
        }
      },
      "intersectionsTable": {
        "type": "table",
        "id": "intersectionsTable",
        "animate": true,
        "hideNone": true,
        "label": "",
        "showActionsColumn": false,
        "items": {
          "fields": {
            "feature": {
              "type": "text",
              "label": ""
            },
            "attributes": {
              "type": "table",
              "label": "",
              "items": {
                "fields": {
                  "crashType": {
                    "type": "text",
                    "label": "Crash Type"
                  },
                  "count": {
                    "type": "number",
                    "label": "Count",
                    "numericEntry": true
                  }
                }
              },
              "showActionsColumn": false,
              "toolbarSticky": false,
              "hideToolbarWithChildren": true,
              "hideToolbar": true
            }
          }
        }
      },
      "roadwayReductionFactors": {
        "type": "table",
        "animate": true,
        "hideNone": true,
        "showActionsColumn": false,
        "items": {
          "fields": {
            "feature": {
              "type": "text",
              "label": "",
              "readonly": true
            },
            "attributes": {
              "type": "table",
              "label": "",
              "items": {
                "fields": {
                  "factor": {
                    "type": "text",
                    "label": "Factor",
                    "readonly": true
                  },
                  "factorType": {
                    "type": "select",
        						"optionLabels": ["None",
                                     "Raise Median - Two Lane - Urban",
				                    		 		 "Raise Median - Multi Lanes - Urban",
				                    		 		 "Raise Median - Multi Lanes - Rural",
				                    		 		 "Provide Lighting",
				                    		 		 "Install Centerline Rumble Strips - Two lane - Rural",
				                    		 		 "Increase Shoulder Width"],
                    "label": "Factor Type",
                    "hideNone": true
                  }
                }
              },
              "showActionsColumn": false,
              "toolbarSticky": false,
              "hideToolbarWithChildren": true,
              "hideToolbar": true
            }
          }
        }
      },
      "intersectionsReductionsFactorsTable": {
        "type": "table",
        "animate": true,
        "hideNone": true,
        "showActionsColumn": false,
        "items": {
          "fields": {
            "feature": {
              "type": "text",
              "label": "",
              "readonly": true
            },
            "attributes": {
              "type": "table",
              "label": "",
              "items": {
                "fields": {
                  "factor": {
                    "type": "text",
                    "label": "Factor",
                    "readonly": true
                  },
                  "factorType": {
                    "type": "select",
        						"optionLabels": ["None",
                                     "Convert Stop Controlled Intersection to Roundabout- One Lane - Rural",
											        			 "Convert Stop Controlled Intersection to Roundabout- One Lane - Urban",
											        			 "Convert Stop Controlled Intersection to Roundabout- Two Lanes - Suburban",
											        			 "Convert Minor Stop to All-Way Stop - Rural",
											        			 "Convert Stop Control to Signal - 3 or 4 legs - Rural",
											        			 "Convert Stop Control to Signal - 4 legs - Urban",
											        			 "Change Intersection Skew Angle - 3 legs - Rural",
				                    		 		 "Change Intersection Skew Angle - 4 legs - Rural",
				                    		 		 "Provide Left Turn Lane on one Approach - 3 legs, stop controlled - Rural",
				                    		 		 "Provide Left Turn Lane on one Approach - 4 legs, stop controlled - Rural",
				                    		 		 "Provide Left Turn Lane on one Approach - 4 legs, stop controlled - Urban",
				                    		 		 "Provide Left Turn Lane on one Approach - 4 legs, signalized controlled - Urban",
				                    		 		 "Provide Lighting"],
                    "label": "Factor Type",
                    "hideNone": true
                  }
                }
              },
              "showActionsColumn": false,
              "toolbarSticky": false,
              "hideToolbarWithChildren": true,
              "hideToolbar": true
            }
          }
        }
      },
      "csl": {
        "type": "select",
        "optionLabels": ["CSL1 - NHS - Interstate", "CSL2 - NHS - Non-Interstate", "CSL3 - Regional Corridors", "CSL4 - Local Connectors", "CSL5 - Class 1 THs", "CSL6 - Class 2 and 3 THs"]
      },
      "new": {
        "type": "select",
        "optionLabels": ["Yes", "No", "Not Applicable"],
      },
      "thisProject": {
        "dependencies": {
          "new": ["No", "Not Applicable"],
        },
        "type": "select",
        "optionLabels": ["replaces", "rehabilitates", "performs preventative maintenance on"],
        "validate": false
      },
      "preLoS": {
        "type": "select",
        "optionLabels": ["LOS A/B", "LOS C", "LOS D", "LOS E", "LOS F"]
      },
      "postLoS": {
        "type": "select",
        "optionLabels": ["LOS A/B", "LOS C", "LOS D", "LOS E", "LOS F"]
      },
      "placeholder": {
        "type": "text",
        "readonly": true
      },
      "nri": {
        "type": "number",
        "numericEntry": true,
        "constrainMaxLength": true,
        "constrainMinLength": true
      },
      "cca": {
        "type": "number",
        "numericEntry": true,
        "constrainMaxLength": true,
        "constrainMinLength": true
      },
      // "criticality": {
      //   "type": "checkbox",
      //   "label": "Check this box if the primary assets are deemed critical for other reasons."
      // },
      // "criticalityReasons": {
      //   "dependencies": {
      //     "criticality": true
      //   },
      //   "type": "text",
      //   "validate": false
      // },
      "vulnerabilityDesc": {
        "type": "radio",
        "optionLabels": [
                          "One or more major weaknesses have been identified. The asset is highly susceptible to extreme events.The asset lacks redundancy or physical protections. The asset would not be functional for a very long period of time after the event.",
                          "One or more major weaknesses have been identified. The asset is highly susceptible to extreme events.The asset has a poor level of redundancy or physical protections.The asset would not be functional for a long period of time after the event.",
                          "One or more significant weaknesses have been identified. The asset is very susceptible to extreme events.The asset has a poor level of redundancy or physical protections.The asset would not be functional for a moderate period of time after the event.",
                          "One or more significant weaknesses have been identified. The asset is susceptible to extreme events.The asset has a fair level of redundancy or physical protections.The asset would not be functional for a moderate period of time after the event.",
                          "One or more minor weaknesses have been identified. The asset is susceptible to extreme events.The asset has a fair level of redundancy or physical protections.The asset would not be functional for a short period of time after the event.",
                          "A minor weakness has been identified. The asset is somewhat susceptibile to extreme events.The asset has a good level of redundancy or physical protections.The asset would be not be functional for a short period of time after an event.",
                          "A minor weakness has been identified. The asset is somewhat susceptibile to extreme events.The asset has excellent redundancy or physical protections.The asset would not be functional immediately after an event.",
                          "No weaknesses exist. The asset is not vulnerable to extreme events. The asset has incorporated excellent redundancy or physical protections.The asset would be operational immediately after the event."
                        ]
      },
      "wildlife": {
        "type": "table",
        "label": "Choose all of the following environmental mitigations that are being included in your project. Enter your selection in the appropriate column: 'Required Mitigations' - those required by legislation or the permit process or 'Voluntary Mitigation' - those not required by law or statute.",
        "showActionsColumn": false,
        "items": {
          "fields": {
            "description": {
              "type": "textarea",
              "rows": 1,
              "label": "Wildlife Mitigation Description",
              "view": "display"
            },
            "requiredMit": {
              "type": "checkbox",
              "label": "Required Mitigation"
            },
            "voluntaryMit": {
              "type": "checkbox",
              "label": "Voluntary Mitigation"
            }
          }
        }
      },
      "airQuality": {
        "type": "table",
        "label": "",
        "showActionsColumn": false,
        "items": {
          "fields": {
            "description": {
              "type": "textarea",
              "rows": 1,
              "label": "Air Quality Mitigation Description",
              "view": "display"
            },
            "requiredMit": {
              "type": "checkbox",
              "label": "Required Mitigation"
            },
            "voluntaryMit": {
              "type": "checkbox",
              "label": "Voluntary Mitigation"
            }
          }
        }
      },
      "waterQuality": {
        "type": "table",
        "label": "",
        "showActionsColumn": false,
        "items": {
          "fields": {
            "description": {
              "type": "textarea",
              "rows": 1,
              "label": "Water Quality Mitigation Description",
              "view": "display"
            },
            "requiredMit": {
              "type": "checkbox",
              "label": "Required Mitigation"
            },
            "voluntaryMit": {
              "type": "checkbox",
              "label": "Voluntary Mitigation"
            }
          }
        }
      },
      "culturalResources": {
        "type": "table",
        "label": "",
        "showActionsColumn": false,
        "items": {
          "fields": {
            "description": {
              "type": "textarea",
              "rows": 1,
              "label": "Cultural Resources Mitigation Description",
              "view": "display"
            },
            "requiredMit": {
              "type": "checkbox",
              "label": "Required Mitigation"
            },
            "voluntaryMit": {
              "type": "checkbox",
              "label": "Voluntary Mitigation"
            }
          }
        }
      },
      // "longTermVision": {
      //   "type": "select",
      //   "optionLabels": ["Yes", "No"]
      // },
      // "shortTermVision": {
      //   "type": "select",
      //   "optionLabels": ["Yes", "No"]
      // },
      // "senseOfCommunity": {
      //   "type": "select",
      //   "optionLabels": ["Yes", "No"]
      // },
      // "facilities": {
      //   "type": "select",
      //   "optionLabels": ["Yes", "No"]
      // },
      // "improvementInstructions": {
      //   "type": "text",
      //   "id": "instr",
      //   "label": "In this section you are provided with three health access descriptions and asked to rank your project based on level of improvement to those descriptions (No Improvement, Low Improvement, High Improvement). Low Improvement projects include upgrades to one or more of the following existing infrastructure; sidewalks, crosswalks, shoulders, bus stop and signals. High Improvement projects include new construction of one or more of the following; new sidewalks, crosswalk, shoulders, ADA intersection upgrades, new bus stop, intersection upgrades including the addition of pedestrian phases, and new transit routes.",
      //   "fieldClass": "instructions"
      // },
      // "healthCare": {
      //   "type": "select",
      //   "optionLabels": ["No Improvement", "Low Improvement", "High Improvement"]
      // },
      // "healthFood": {
      //   "type": "select",
      //   "optionLabels": ["No Improvement", "Low Improvement", "High Improvement"]
      // },
      // "physicalActivity": {
      //   "type": "select",
      //   "optionLabels": ["No Improvement", "Low Improvement", "High Improvement"]
      // }
    }
  };

  /**
   * This is an optional post render callback that Alpaca will call once the form finishes rendering.  The form
   * rendering itself is asynchronous as it may load templates or other resources for use in generating the UI.
   *
   * Once the render is completed, this callback is fired and the top-level Alpaca control is handed back.
   *
   * @param control
   */

  var postRenderCallback = function(control) {

    control.childrenByPropertyId["numberOfIntersections"].on("change", function() {
            
      var times = this.getValue();
      var value = control.childrenByPropertyId["intersectionsTable"].getValue(value);

      if (value.length < times) {
        for (var i = value.length; i < times; i++) {
          value.push({
            "feature": "Intersection " + (i + 1),
            "attributes": [{
              "crashType": "Fatal [K]",
              "count": ""
            }, {
              "crashType": "Disabling Injury [A]",
              "count": ""
            }, {
              "crashType": "Evident Injury [B]",
              "count": ""
            }, {
              "crashType": "Possible Injury [C]",
              "count": ""
            }, {
              "crashType": "Property Damage Only [O]",
              "count": ""
            }]                  
          })
        }
      } else {
        while (value.length > times) {
          value.pop();
        }
      }
      control.childrenByPropertyId["intersectionsTable"].setValue(value);

      var value2 = control.childrenByPropertyId["intersectionsGeometryTable"].getValue(value2);

      if (value2.length < times) {
        pmOptions.fields.intersectionsGeometryTable.hidden = true;
        for (var i = value2.length; i < times; i++) {
          value2.push({
            "feature": "Intersection " + (i + 1),
            "attributes": [{
              "skewAngle": "Existing Skew Angle",
              "degree": ""
            }, {
              "skewAngle": "Proposed Skew Angle",
              "degree": ""
            }]                  
          })
        }
      } else {
        while (value2.length > times) {
          value2.pop();
        }
      }
      control.childrenByPropertyId["intersectionsGeometryTable"].setValue(value2);

      var value3 = control.childrenByPropertyId["intersectionsReductionsFactorsTable"].getValue(value3);

      if (value3.length < times) {
        for (var i = value3.length; i < times; i++) {
          value3.push({
           "feature": "Intersection " + (i + 1),
	      	"attributes": [{
	          "factor": "1",
	          "factorType": "None"
	        }, {
	          "factor": "2",
	          "factorType": "None"
	        }, {
	          "factor": "3",
	          "factorType": "None"
	        }]                 
          })
        }
      } else {
        while (value3.length > times) {
          value3.pop();
        }
      }
      control.childrenByPropertyId["intersectionsReductionsFactorsTable"].setValue(value3);
    });
  };

  /**
   * Render the form.
   */

  function wizardPM () {

    $("#wizardPM").alpaca({
      "data": pmData,
      "schema": pmSchema,
      "options": pmOptions,
      "postRender": postRenderCallback,
      "view": {
        "parent": "bootstrap-edit",
        "displayReadonly": true,
        "wizard": {
          "title": "",
          "description": "",
          "bindings": {
            "PIN": 1,
            "projectLength": 2,
            "projectCost": 2,
            "averageAADT": 2,
            "existingShoulderWidth": 2,
            "proposedShoulderWidth": 2,
            "numberOfIntersections": 2,
            "intersectionsGeometryTable": 2,
            "roadwayCrashes": 3,
            "intersectionsTable": 3,
            "roadwayReductionFactors": 3,
            "intersectionsReductionsFactorsTable": 3,
            "csl": 4,
            "new": 4,
            "thisProject": 4,
            "preLoS": 5,
            "postLoS": 5,
            "placeholder": 6,
            "nri": 7,
            "cca": 7,
            "criticality": 7,
            "criticalityReasons": 7,
            "vulnerabilityDesc": 7,
            "wildlife": 8,
            "airQuality": 8,
            "waterQuality": 8,
            "culturalResources": 8,
            "longTermVision": 8,
            "shortTermVision": 8,
            "senseOfCommunity": 8,
            "facilities": 8,
            "improvementInstructions": 9,
            "healthCare": 9,
            "healthFood": 9,
            "physicalActivity": 9
          },
          "steps": [{
            "title": "Introduction",
            "description": "Let's get started."
          },{
            "title": "Project Information",
            "description": "Project Information"
          },{
            "title": "Safety",
            "description": "Safety Information"
          },{
            "title": "Asset Condition",
            "description": "Asset Information"
          },{
            "title": "Mobility/Connectivity",
            "description": "Mobility/Connectivity Information"
          },{
            "title": "Economic Access",
            "description": "Economic Access Information"
          },{
            "title": "Resiliency",
            "description": "Resiliency Information"
          },{
            "title": "Environment",
            "description": "Environment Information"
          }],
          "showSteps": true,
          "showProgressBar": false,
          "buttons": {
            // "first": {
            //   "title": "Go to First Page",
            //   "align": "left",
            //   "click": function(e) {
            //     this.trigger("moveToStep", {
            //       "index": 0,
            //       "skipValidation": true
            //     });
            //   }
            // },
            "previous": {
              "validate": function(callback) {
                console.log("Previous validate()");
                callback(true);
              }
            },
            "next": {
              "validate": function(callback) {
                console.log("Next validate()");
                callback(true);
              }
            },
            "submit": {
              "title": "All Done!",
              "validate": function(callback) {
                console.log("Submit validate()");
                callback(true);
              },
              "click": function(e) {
                          
                var url = "https://services1.arcgis.com/NXmBVyW5TaiCXqFs/arcgis/rest/services/pm_form_db/FeatureServer/0/addFeatures";

                var ts = new Date();

                var val = this.getValue();
                console.log("this", val);

                var toAdd = {};

                if (val.intersectionsGeometryTable.length == 1) {
                  toAdd = {
                    "Int1ExistingSkewAngle": val.intersectionsGeometryTable[0].attributes[0].degree,
                    "Int1PropSkewAngle": val.intersectionsGeometryTable[0].attributes[1].degree,
                    "Int2ExistingSkewAngle": "",
                    "Int2PropSkewAngle": "",
                    "Int3ExistingSkewAngle": "",
                    "Int3PropSkewAngle": "",
                    "Int4ExistingSkewAngle": "",
                    "Int4PropSkewAngle": "",
                    "Int1Fatal": val.intersectionsTable[0].attributes[0].count,
                    "Int1DisablingInjury": val.intersectionsTable[0].attributes[1].count,
                    "Int1EvidentInjury": val.intersectionsTable[0].attributes[2].count,
                    "Int1PossibleInjury": val.intersectionsTable[0].attributes[3].count,
                    "Int1PropertyInjury": val.intersectionsTable[0].attributes[4].count,
                    "Int2Fatal": "",
                    "Int2DisablingInjury": "",
                    "Int2EvidentInjury": "",
                    "Int2PossibleInjury": "",
                    "Int2PropertyInjury": "",
                    "Int3Fatal": "",
                    "Int3DisablingInjury": "",
                    "Int3EvidentInjury": "",
                    "Int3PossibleInjury": "",
                    "Int3PropertyInjury": "",
                    "Int4Fatal": "",
                    "Int4DisablingInjury": "",
                    "Int4EvidentInjury": "",
                    "Int4PossibleInjury": "",
                    "Int4PropertyInjury": "",
                    "Int1ReductionFactor1": val.intersectionsReductionsFactorsTable[0].attributes[0].factorType,
                    "Int1ReductionFactor2": val.intersectionsReductionsFactorsTable[0].attributes[1].factorType,
                    "Int1ReductionFactor3": val.intersectionsReductionsFactorsTable[0].attributes[2].factorType,
                    "Int2ReductionFactor1": "",
                    "Int2ReductionFactor2": "",
                    "Int2ReductionFactor3": "",
                    "Int3ReductionFactor1": "",
                    "Int3ReductionFactor2": "",
                    "Int3ReductionFactor3": "",
                    "Int4ReductionFactor1": "",
                    "Int4ReductionFactor2": "",
                    "Int4ReductionFactor3": "",
                  }
                }
                else if (val.intersectionsGeometryTable.length == 2) {
                  toAdd = {
                    "Int1ExistingSkewAngle": val.intersectionsGeometryTable[0].attributes[0].degree,
                    "Int1PropSkewAngle": val.intersectionsGeometryTable[0].attributes[1].degree,
                    "Int2ExistingSkewAngle": val.intersectionsGeometryTable[1].attributes[0].degree,
                    "Int2PropSkewAngle": val.intersectionsGeometryTable[1].attributes[1].degree,
                    "Int3ExistingSkewAngle": "",
                    "Int3PropSkewAngle": "",
                    "Int4ExistingSkewAngle": "",
                    "Int4PropSkewAngle": "",
                    "Int1Fatal": val.intersectionsTable[0].attributes[0].count,
                    "Int1DisablingInjury": val.intersectionsTable[0].attributes[1].count,
                    "Int1EvidentInjury": val.intersectionsTable[0].attributes[2].count,
                    "Int1PossibleInjury": val.intersectionsTable[0].attributes[3].count,
                    "Int1PropertyInjury": val.intersectionsTable[0].attributes[4].count,
                    "Int2Fatal": val.intersectionsTable[1].attributes[0].count,
                    "Int2DisablingInjury": val.intersectionsTable[1].attributes[1].count,
                    "Int2EvidentInjury": val.intersectionsTable[1].attributes[2].count,
                    "Int2PossibleInjury": val.intersectionsTable[1].attributes[3].count,
                    "Int2PropertyInjury": val.intersectionsTable[1].attributes[4].count,
                    "Int3Fatal": "",
                    "Int3DisablingInjury": "",
                    "Int3EvidentInjury": "",
                    "Int3PossibleInjury": "",
                    "Int3PropertyInjury": "",
                    "Int4Fatal": "",
                    "Int4DisablingInjury": "",
                    "Int4EvidentInjury": "",
                    "Int4PossibleInjury": "",
                    "Int4PropertyInjury": "",
                    "Int1ReductionFactor1": val.intersectionsReductionsFactorsTable[0].attributes[0].factorType,
                    "Int1ReductionFactor2": val.intersectionsReductionsFactorsTable[0].attributes[1].factorType,
                    "Int1ReductionFactor3": val.intersectionsReductionsFactorsTable[0].attributes[2].factorType,
                    "Int2ReductionFactor1": val.intersectionsReductionsFactorsTable[1].attributes[0].factorType,
                    "Int2ReductionFactor2": val.intersectionsReductionsFactorsTable[1].attributes[1].factorType,
                    "Int2ReductionFactor3": val.intersectionsReductionsFactorsTable[1].attributes[2].factorType,
                    "Int3ReductionFactor1": "",
                    "Int3ReductionFactor2": "",
                    "Int3ReductionFactor3": "",
                    "Int4ReductionFactor1": "",
                    "Int4ReductionFactor2": "",
                    "Int4ReductionFactor3": ""
                  }
                }
                else if (val.intersectionsGeometryTable.length == 3) {
                  toAdd = {
                    "Int1ExistingSkewAngle": val.intersectionsGeometryTable[0].attributes[0].degree,
                    "Int1PropSkewAngle": val.intersectionsGeometryTable[0].attributes[1].degree,
                    "Int2ExistingSkewAngle": val.intersectionsGeometryTable[1].attributes[0].degree,
                    "Int2PropSkewAngle": val.intersectionsGeometryTable[1].attributes[1].degree,
                    "Int3ExistingSkewAngle": val.intersectionsGeometryTable[2].attributes[0].degree,
                    "Int3PropSkewAngle": val.intersectionsGeometryTable[2].attributes[1].degree,
                    "Int4ExistingSkewAngle": "",
                    "Int4PropSkewAngle": "",
                    "Int1Fatal": val.intersectionsTable[0].attributes[0].count,
                    "Int1DisablingInjury": val.intersectionsTable[0].attributes[1].count,
                    "Int1EvidentInjury": val.intersectionsTable[0].attributes[2].count,
                    "Int1PossibleInjury": val.intersectionsTable[0].attributes[3].count,
                    "Int1PropertyInjury": val.intersectionsTable[0].attributes[4].count,
                    "Int2Fatal": val.intersectionsTable[1].attributes[0].count,
                    "Int2DisablingInjury": val.intersectionsTable[1].attributes[1].count,
                    "Int2EvidentInjury": val.intersectionsTable[1].attributes[2].count,
                    "Int2PossibleInjury": val.intersectionsTable[1].attributes[3].count,
                    "Int2PropertyInjury": val.intersectionsTable[1].attributes[4].count,
                    "Int3Fatal": val.intersectionsTable[2].attributes[0].count,
                    "Int3DisablingInjury": val.intersectionsTable[2].attributes[1].count,
                    "Int3EvidentInjury": val.intersectionsTable[2].attributes[2].count,
                    "Int3PossibleInjury": val.intersectionsTable[2].attributes[3].count,
                    "Int3PropertyInjury": val.intersectionsTable[2].attributes[4].count,
                    "Int4Fatal": "",
                    "Int4DisablingInjury": "",
                    "Int4EvidentInjury": "",
                    "Int4PossibleInjury": "",
                    "Int4PropertyInjury": "",
                    "Int1ReductionFactor1": val.intersectionsReductionsFactorsTable[0].attributes[0].factorType,
                    "Int1ReductionFactor2": val.intersectionsReductionsFactorsTable[0].attributes[1].factorType,
                    "Int1ReductionFactor3": val.intersectionsReductionsFactorsTable[0].attributes[2].factorType,
                    "Int2ReductionFactor1": val.intersectionsReductionsFactorsTable[1].attributes[0].factorType,
                    "Int2ReductionFactor2": val.intersectionsReductionsFactorsTable[1].attributes[1].factorType,
                    "Int2ReductionFactor3": val.intersectionsReductionsFactorsTable[1].attributes[2].factorType,
                    "Int3ReductionFactor1": val.intersectionsReductionsFactorsTable[2].attributes[0].factorType,
                    "Int3ReductionFactor2": val.intersectionsReductionsFactorsTable[2].attributes[1].factorType,
                    "Int3ReductionFactor3": val.intersectionsReductionsFactorsTable[2].attributes[2].factorType,
                    "Int4ReductionFactor1": "",
                    "Int4ReductionFactor2": "",
                    "Int4ReductionFactor3": ""
                  }
                }
                else if (val.intersectionsGeometryTable.length == 4) {
                  toAdd = {
                    "Int1ExistingSkewAngle": val.intersectionsGeometryTable[0].attributes[0].degree,
                    "Int1PropSkewAngle": val.intersectionsGeometryTable[0].attributes[1].degree,
                    "Int2ExistingSkewAngle": val.intersectionsGeometryTable[1].attributes[0].degree,
                    "Int2PropSkewAngle": val.intersectionsGeometryTable[1].attributes[1].degree,
                    "Int3ExistingSkewAngle": val.intersectionsGeometryTable[2].attributes[0].degree,
                    "Int3PropSkewAngle": val.intersectionsGeometryTable[2].attributes[1].degree,
                    "Int4ExistingSkewAngle": val.intersectionsGeometryTable[3].attributes[0].degree,
                    "Int4PropSkewAngle": val.intersectionsGeometryTable[3].attributes[1].degree,
                    "Int1Fatal": val.intersectionsTable[0].attributes[0].count,
                    "Int1DisablingInjury": val.intersectionsTable[0].attributes[1].count,
                    "Int1EvidentInjury": val.intersectionsTable[0].attributes[2].count,
                    "Int1PossibleInjury": val.intersectionsTable[0].attributes[3].count,
                    "Int1PropertyInjury": val.intersectionsTable[0].attributes[4].count,
                    "Int2Fatal": val.intersectionsTable[1].attributes[0].count,
                    "Int2DisablingInjury": val.intersectionsTable[1].attributes[1].count,
                    "Int2EvidentInjury": val.intersectionsTable[1].attributes[2].count,
                    "Int2PossibleInjury": val.intersectionsTable[1].attributes[3].count,
                    "Int2PropertyInjury": val.intersectionsTable[1].attributes[4].count,
                    "Int3Fatal": val.intersectionsTable[2].attributes[0].count,
                    "Int3DisablingInjury": val.intersectionsTable[2].attributes[1].count,
                    "Int3EvidentInjury": val.intersectionsTable[2].attributes[2].count,
                    "Int3PossibleInjury": val.intersectionsTable[2].attributes[3].count,
                    "Int3PropertyInjury": val.intersectionsTable[2].attributes[4].count,
                    "Int4Fatal": val.intersectionsTable[3].attributes[0].count,
                    "Int4DisablingInjury": val.intersectionsTable[3].attributes[1].count,
                    "Int4EvidentInjury": val.intersectionsTable[3].attributes[2].count,
                    "Int4PossibleInjury": val.intersectionsTable[3].attributes[3].count,
                    "Int4PropertyInjury": val.intersectionsTable[3].attributes[4].count,
                    "Int1ReductionFactor1": val.intersectionsReductionsFactorsTable[0].attributes[0].factorType,
                    "Int1ReductionFactor2": val.intersectionsReductionsFactorsTable[0].attributes[1].factorType,
                    "Int1ReductionFactor3": val.intersectionsReductionsFactorsTable[0].attributes[2].factorType,
                    "Int2ReductionFactor1": val.intersectionsReductionsFactorsTable[1].attributes[0].factorType,
                    "Int2ReductionFactor2": val.intersectionsReductionsFactorsTable[1].attributes[1].factorType,
                    "Int2ReductionFactor3": val.intersectionsReductionsFactorsTable[1].attributes[2].factorType,
                    "Int3ReductionFactor1": val.intersectionsReductionsFactorsTable[2].attributes[0].factorType,
                    "Int3ReductionFactor2": val.intersectionsReductionsFactorsTable[2].attributes[1].factorType,
                    "Int3ReductionFactor3": val.intersectionsReductionsFactorsTable[2].attributes[2].factorType,
                    "Int4ReductionFactor1": val.intersectionsReductionsFactorsTable[3].attributes[0].factorType,
                    "Int4ReductionFactor2": val.intersectionsReductionsFactorsTable[3].attributes[1].factorType,
                    "Int4ReductionFactor3": val.intersectionsReductionsFactorsTable[3].attributes[2].factorType
                  }
                } else {
                  toAdd = {
                    "Int1ExistingSkewAngle": "",
                    "Int1PropSkewAngle": "",
                    "Int2ExistingSkewAngle": "",
                    "Int2PropSkewAngle": "",
                    "Int3ExistingSkewAngle": "",
                    "Int3PropSkewAngle": "",
                    "Int4ExistingSkewAngle": "",
                    "Int4PropSkewAngle": "",
                    "Int1Fatal": "",
                    "Int1DisablingInjury": "",
                    "Int1EvidentInjury": "",
                    "Int1PossibleInjury": "",
                    "Int1PropertyInjury": "",
                    "Int2Fatal": "",
                    "Int2DisablingInjury": "",
                    "Int2EvidentInjury": "",
                    "Int2PossibleInjury": "",
                    "Int2PropertyInjury": "",
                    "Int3Fatal": "",
                    "Int3DisablingInjury": "",
                    "Int3EvidentInjury": "",
                    "Int3PossibleInjury": "",
                    "Int3PropertyInjury": "",
                    "Int4Fatal": "",
                    "Int4DisablingInjury": "",
                    "Int4EvidentInjury": "",
                    "Int4PossibleInjury": "",
                    "Int4PropertyInjury": "",
                    "Int1ReductionFactor1": "",
                    "Int1ReductionFactor2": "",
                    "Int1ReductionFactor3": "",
                    "Int2ReductionFactor1": "",
                    "Int2ReductionFactor2": "",
                    "Int2ReductionFactor3": "",
                    "Int3ReductionFactor1": "",
                    "Int3ReductionFactor2": "",
                    "Int3ReductionFactor3": "",
                    "Int4ReductionFactor1": "",
                    "Int4ReductionFactor2": "",
                    "Int4ReductionFactor3": ""
                  }
                }

                var feature = {
                  "attributes": {
                    "Pin": val.PIN,
                    "ProjectLength": val.projectLength,
                    "ProjectCost": val.projectCost,
                    "averageAADT": val.averageAADT,
                    "ExistingShoulderWidth": val.existingShoulderWidth,
                    "ProposedShoulderWidth": val.proposedShoulderWidth,
                    "NumberofIntersections": val.numberOfIntersections,
                    "Int1ExistingSkewAngle": toAdd.Int1ExistingSkewAngle,
                    "Int1PropSkewAngle": toAdd.Int1PropSkewAngle,
                    "Int2ExistingSkewAngle": toAdd.Int2ExistingSkewAngle,
                    "Int2PropSkewAngle": toAdd.Int2PropSkewAngle,
                    "Int3ExistingSkewAngle": toAdd.Int3ExistingSkewAngle,
                    "Int3PropSkewAngle": toAdd.Int3PropSkewAngle,
                    "Int4ExistingSkewAngle": toAdd.Int4ExistingSkewAngle,
                    "Int4PropSkewAngle": toAdd.Int4PropSkewAngle,
                    "RoadwayFatal": val.roadwayCrashes[0].attributes[0].count,
                    "RoadwayDisablingInjury": val.roadwayCrashes[0].attributes[1].count,
                    "RoadwayEvidentInjury": val.roadwayCrashes[0].attributes[2].count,
                    "RoadwayPossibleInjury": val.roadwayCrashes[0].attributes[3].count,
                    "RoadwayPropertyDamage": val.roadwayCrashes[0].attributes[4].count,
                    "Int1Fatal": toAdd.Int1Fatal,
                    "Int1DisablingInjury": toAdd.Int1DisablingInjury,
                    "Int1EvidentInjury": toAdd.Int1EvidentInjury,
                    "Int1PossibleInjury": toAdd.Int1PossibleInjury,
                    "Int1PropertyDamage": toAdd.Int1PropertyInjury,
                    "Int2Fatal": toAdd.Int2Fatal,
                    "Int2DisablingInjury": toAdd.Int2DisablingInjury,
                    "Int2EvidentInjury": toAdd.Int2EvidentInjury,
                    "Int2PossibleInjury": toAdd.Int2PossibleInjury,
                    "Int2PropertyDamage": toAdd.Int2PropertyInjury,
                    "Int3Fatal": toAdd.Int3Fatal,
                    "Int3DisablingInjury": toAdd.Int3DisablingInjury,
                    "Int3EvidentInjury": toAdd.Int3EvidentInjury,
                    "Int3PossibleInjury": toAdd.Int3PossibleInjury,
                    "Int3PropertyDamage": toAdd.Int3PropertyInjury,
                    "Int4Fatal": toAdd.Int4Fatal,
                    "Int4DisablingInjury": toAdd.Int4DisablingInjury,
                    "Int4EvidentInjury": toAdd.Int4EvidentInjury,
                    "Int4PossibleInjury": toAdd.Int4PossibleInjury,
                    "Int4PropertyDamage": toAdd.Int4PropertyInjury,
                    "RoadwayReductionFactor1": val.roadwayReductionFactors[0].attributes[0].factorType,
                    "RoadwayReductionFactor2": val.roadwayReductionFactors[0].attributes[1].factorType,
                    "RoadwayReductionFactor3": val.roadwayReductionFactors[0].attributes[2].factorType,
                    "Int1ReductionFactor1": toAdd.Int1ReductionFactor1,
                    "Int1ReductionFactor2": toAdd.Int1ReductionFactor2,
                    "Int1ReductionFactor3": toAdd.Int1ReductionFactor3,
                    "Int2ReductionFactor1": toAdd.Int2ReductionFactor1,
                    "Int2ReductionFactor2": toAdd.Int2ReductionFactor2,
                    "Int2ReductionFactor3": toAdd.Int2ReductionFactor3,
                    "Int3ReductionFactor1": toAdd.Int3ReductionFactor1,
                    "Int3ReductionFactor2": toAdd.Int3ReductionFactor2,
                    "Int3ReductionFactor3": toAdd.Int3ReductionFactor3,
                    "Int4ReductionFactor1": toAdd.Int4ReductionFactor1,
                    "Int4ReductionFactor2": toAdd.Int4ReductionFactor2,
                    "Int4ReductionFactor3": toAdd.Int4ReductionFactor3,
                    "csl": val.csl,
                    "new": val.new,
                    "ThisProject": val.thisProject,
                    "PreLoS": val.preLoS,
                    "PostLoS": val.postLoS,
                    "nri": val.nri,
                    "cca": val.cca,
                    "VulnerabilityDesc": val.vulnerabilityDesc,
                    "Wildlife1ReqMit": val.wildlife[0].requiredMit,
                    "Wildlife1VolMit": val.wildlife[0].voluntaryMit,
                    "Wildlife2ReqMit": val.wildlife[1].requiredMit,
                    "Wildlife2VolMit": val.wildlife[1].voluntaryMit,
                    "Wildlife3ReqMit": val.wildlife[2].requiredMit,
                    "Wildlife3VolMit": val.wildlife[2].voluntaryMit,
                    "Wildlife4ReqMit": val.wildlife[3].requiredMit,
                    "Wildlife4VolMit": val.wildlife[3].voluntaryMit,
                    "Wildlife5ReqMit": val.wildlife[4].requiredMit,
                    "Wildlife5VolMit": val.wildlife[4].voluntaryMit,
                    "Wildlife6ReqMit": val.wildlife[5].requiredMit,
                    "Wildlife6VolMit": val.wildlife[5].voluntaryMit,
                    "Wildlife7ReqMit": val.wildlife[6].requiredMit,
                    "Wildlife7VolMit": val.wildlife[6].voluntaryMit,
                    "Wildlife8ReqMit": val.wildlife[7].requiredMit,
                    "Wildlife8VolMit": val.wildlife[7].voluntaryMit,
                    "Wildlife9ReqMit": val.wildlife[8].requiredMit,
                    "Wildlife9VolMit": val.wildlife[8].voluntaryMit,
                    "AirQuality1ReqMit": val.airQuality[0].requiredMit,
                    "AirQuality1VolMit": val.airQuality[0].voluntaryMit,
                    "AirQuality2ReqMit": val.airQuality[1].requiredMit,
                    "AirQuality2VolMit": val.airQuality[1].voluntaryMit,
                    "AirQuality3ReqMit": val.airQuality[2].requiredMit,
                    "AirQuality3VolMit": val.airQuality[2].voluntaryMit,
                    "WaterQuality1ReqMit": val.waterQuality[0].requiredMit,
                    "WaterQuality1VolMit": val.waterQuality[0].voluntaryMit,
                    "WaterQuality2ReqMit": val.waterQuality[1].requiredMit,
                    "WaterQuality2VolMit": val.waterQuality[1].voluntaryMit,
                    "WaterQuality3ReqMit": val.waterQuality[2].requiredMit,
                    "WaterQuality3VolMit": val.waterQuality[2].voluntaryMit,
                    "WaterQuality4ReqMit": val.waterQuality[3].requiredMit,
                    "WaterQuality4VolMit": val.waterQuality[3].voluntaryMit,
                    "WaterQuality5ReqMit": val.waterQuality[4].requiredMit,
                    "WaterQuality5VolMit": val.waterQuality[4].voluntaryMit,
                    "WaterQuality6ReqMit": val.waterQuality[5].requiredMit,
                    "WaterQuality6VolMit": val.waterQuality[5].voluntaryMit,
                    "WaterQuality7ReqMit": val.waterQuality[6].requiredMit,
                    "WaterQuality7VolMit": val.waterQuality[6].voluntaryMit,
                    "WaterQuality8ReqMit": val.waterQuality[7].requiredMit,
                    "WaterQuality8VolMit": val.waterQuality[7].voluntaryMit,
                    "WaterQuality9ReqMit": val.waterQuality[8].requiredMit,
                    "WaterQuality9VolMit": val.waterQuality[8].voluntaryMit,
                    "CulturalResources1ReqMit": val.culturalResources[0].requiredMit,
                    "CulturalResources1VolMit": val.culturalResources[0].voluntaryMit,
                    "CulturalResources2ReqMit": val.culturalResources[1].requiredMit,
                    "CulturalResources2VolMit": val.culturalResources[1].voluntaryMit,
                    "CulturalResources3ReqMit": val.culturalResources[2].requiredMit,
                    "CulturalResources3VolMit": val.culturalResources[2].voluntaryMit,
                    "CulturalResources4ReqMit": val.culturalResources[3].requiredMit,
                    "CulturalResources4VolMit": val.culturalResources[3].voluntaryMit,
                    "CulturalResources5ReqMit": val.culturalResources[4].requiredMit,
                    "CulturalResources5VolMit": val.culturalResources[4].voluntaryMit,
                    "CulturalResources6ReqMit": val.culturalResources[5].requiredMit,
                    "CulturalResources6VolMit": val.culturalResources[5].voluntaryMit,
                    "CulturalResources7ReqMit": val.culturalResources[6].requiredMit,
                    "CulturalResources7VolMit": val.culturalResources[6].voluntaryMit,
                    "CulturalResources8ReqMit": val.culturalResources[7].requiredMit,
                    "CulturalResources8VolMit": val.culturalResources[7].voluntaryMit,
                    "CulturalResources9ReqMit": val.culturalResources[8].requiredMit,
                    "CulturalResources9VolMit": val.culturalResources[8].voluntaryMit,
                    "CulturalResources10ReqMit": val.culturalResources[9].requiredMit,
                    "CulturalResources10VolMit": val.culturalResources[9].voluntaryMit,
                    "CulturalResources11ReqMit": val.culturalResources[10].requiredMit,
                    "CulturalResources11VolMit": val.culturalResources[10].voluntaryMit,
                    "timestamp": ts.toLocaleString(),
                    "changeAnalysis": 0
                  }
                }
                console.log('feature',feature);
                $.ajax({
                  url: url,
                  type: "POST",
                  data: {
                    features: JSON.stringify([feature]),
                    f: "json" 
                  },
                  success: function(res) {
                    console.log(res);
                  }
                });
              },
              "id": "",
              "attributes": { 
              }
            }
          }
        }
      }
    });
  }

  function wizardAM () {
    $("#wizardAM").alpaca({
      "data": amData,
      "schema": amSchema,
      "options": amOptions,
      //"postRender": postRenderCallback,
      "view": {
        "parent": "bootstrap-edit",
        "displayReadonly": true,
        "wizard": {
          "title": "",
          "description": "",
          "bindings": {
            "PIN": 1,
            "rightTime": 2,
            "schedRecon": 2,
            "schedPrev": 2
          },
          "steps": [{
            "title": "Project",
            "description": "Identify Project"
          },{
            "title": "Asset Condition",
            "description": "Connectivity Information"
          }],
          "showSteps": true,
          "showProgressBar": false,
          "buttons": {
            // "first": {
            //   "title": "Go to First Page",
            //   "align": "left",
            //   "click": function(e) {
            //     this.trigger("moveToStep", {
            //       "index": 0,
            //       "skipValidation": true
            //     });
            //   }
            // },
            "previous": {
              "validate": function(callback) {
                console.log("Previous validate()");
                callback(true);
              }
            },
            "next": {
              "validate": function(callback) {
                console.log("Next validate()");
                callback(true);
              }
            },
            "submit": {
              "title": "All Done!",
              "validate": function(callback) {
                console.log("Submit validate()");
                callback(true);
              },
              "click": function(e) {
                          
                var url = "https://services1.arcgis.com/NXmBVyW5TaiCXqFs/arcgis/rest/services/am_form_db/FeatureServer/0/addFeatures";

                var ts = new Date();

                var val = this.getValue();
                console.log("this", val);
                var feature = {
                  "attributes": {
                    "PIN": val.PIN,
                    "schedRecon": val.schedRecon,
                    "schedPrev": val.schedPrev,
                    "timestamp": ts.toLocaleString(),
                    "changeAnalysis": 0
                  }
                }
                console.log('feature',feature);
                $.ajax({
                  url: url,
                  type: "POST",
                  data: {
                    features: JSON.stringify([feature]),
                    f: "json" 
                  },
                  success: function(res) {
                    console.log(res);
                  }
                });
              },
              "id": "mySubmit",
              "attributes": { 
              }
            }
          }
        }
      }
    });
  }

  function wizardRPC () {
    $("#wizardRPC").alpaca({
      "data": rpcData,
      "schema": rpcSchema,
      "options": rpcOptions,
      //"postRender": postRenderCallback,
      "view": {
        "parent": "bootstrap-edit",
        "displayReadonly": true,
        "wizard": {
          "title": "",
          "description": "",
          "bindings": {
            "PIN": 1,
            "bicycleConnectivity": 2,
            "bicycleCorridor": 2,
            "pedestrianConnectivity": 2,
            "growthAreaState": 2,
            "growthAreaRPC": 2,
            "transitConnectivity": 2,
            "transInfraImprovements": 2,
            "transRoute": 2,
            "intermodalConnectivity": 2,
            "parknride": 2,
            "trainStation": 2,
            "railyard": 2,
            "busStation": 2,
            "longTermVision": 3,
            "shortTermVision": 3,
            "senseOfCommunity": 3,
            "communityAccess": 3,
            "improvementInstructions": 4,
            "healthCare": 4,
            "healthFood": 4,
            "physicalActivity": 4
          },
          "steps": [{
            "title": "Project",
            "description": "Identify Project"
          },{
            "title": "Connectivity",
            "description": "Connectivity Information"
          },{
            "title": "Community",
            "description": "Community Information"
          },{
            "title": "Health Access",
            "description": "Health Access Information"
          }],
          "showSteps": true,
          "showProgressBar": false,
          "buttons": {
            // "first": {
            //   "title": "Go to First Page",
            //   "align": "left",
            //   "click": function(e) {
            //     this.trigger("moveToStep", {
            //       "index": 0,
            //       "skipValidation": true
            //     });
            //   }
            // },
            "previous": {
              "validate": function(callback) {
                console.log("Previous validate()");
                callback(true);
              }
            },
            "next": {
              "validate": function(callback) {
                console.log("Next validate()");
                callback(true);
              }
            },
            "submit": {
              "title": "All Done!",
              "validate": function(callback) {
                console.log("Submit validate()");
                callback(true);
              },
              "click": function(e) {

                var url = "https://services1.arcgis.com/NXmBVyW5TaiCXqFs/ArcGIS/rest/services/formLayerTest/FeatureServer/0/addFeatures";

                var ts = new Date();

                var val = this.getValue();
                console.log("this", val);
                var feature = {
                  "attributes": {
                    "PIN": val.PIN,
                    "bicycleConnectivity": val.bicycleConnectivity,
                    "bicycleCorridor": val.bicycleCorridor,
                    "pedestrianConnectivity": val.pedestrianConnectivity,
                    "growthAreaState": val.growthAreaState,
                    "growthAreaRPC": val.growthAreaRPC,
                    "transitConnectivity": val.transitConnectivity,
                    "transInfraImprovements": val.transInfraImprovements,
                    "transRoute": val.transRoute,
                    "intermodalConnectivity": val.intermodalConnectivity,
                    "parknride": val.parknride,
                    "trainStation": val.trainStation,
                    "railyard": val.railyard,
                    "busStation": val.busStation,
                    "longTermVision": val.longTermVision,
                    "shortTermVision": val.shortTermVision,
                    "senseOfCommunity": val.senseOfCommunity,
                    "communityAccess": val.communityAccess,
                    "healthCare": val.healthCare,
                    "healthFood": val.healthFood,
                    "physicalActivity": val.physicalActivity,
                    "timestamp": ts.toLocaleString(),
                    "changeAnalysis": 0
                  }
                }
                console.log('feature',feature);
                $.ajax({
                  url: url,
                  type: "POST",
                  data: {
                    features: JSON.stringify([feature]),
                    f: "json" 
                  },
                  success: function(res) {
                    console.log(res);
                  }
                });
              },
              "id": "mySubmit",
              "attributes": { 
              }
            }
          }
        }
      }
    });
  }

});
