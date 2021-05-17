/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEvent = /* GraphQL */ `
  mutation CreateEvent(
    $input: CreateEventInput!
    $condition: ModelEventConditionInput
  ) {
    createEvent(input: $input, condition: $condition) {
      id
      type
      targetTimestamp
      kind
      eventId
      status
      isTest
      isCanceled
      originTime
      arrivalTime
      tsunamiForecast {
        areaTsunamiList {
          code
          name
          levelCode
          firstHeight {
            arrivalTime
            condition
            initial
            height {
              condition
              description
              height
              addInfo
            }
          }
          maxHeight {
            dateTime
            condition
            height {
              condition
              description
              height
              addInfo
            }
          }
        }
        stationTsunamiList {
          code
          name
          area {
            code
            name
            levelCode
            firstHeight {
              arrivalTime
              condition
              initial
              height {
                condition
                description
                height
                addInfo
              }
            }
            maxHeight {
              dateTime
              condition
              height {
                condition
                description
                height
                addInfo
              }
            }
          }
          levelCode
        }
      }
      tsunamiObservation {
        stationTsunamiList {
          code
          name
          area {
            code
            name
            levelCode
            firstHeight {
              arrivalTime
              condition
              initial
              height {
                condition
                description
                height
                addInfo
              }
            }
            maxHeight {
              dateTime
              condition
              height {
                condition
                description
                height
                addInfo
              }
            }
          }
          levelCode
        }
      }
      earthquakeForecast {
        hypocenterTokyo {
          areaCode
          areaName
          locationTokyo
          locationJGD
          depth
          description
          magnitude
          landOrSea
          travelTimeTable {
            P
            S
            D
          }
        }
        hypocenterJGD {
          areaCode
          areaName
          locationTokyo
          locationJGD
          depth
          description
          magnitude
          landOrSea
          travelTimeTable {
            P
            S
            D
          }
        }
        serial
        isWarning
        isEnd
        isPlum
      }
      earthquakeObservation {
        hypocenterTokyo {
          areaCode
          areaName
          locationTokyo
          locationJGD
          depth
          description
          magnitude
          landOrSea
          travelTimeTable {
            P
            S
            D
          }
        }
        hypocenterJGD {
          areaCode
          areaName
          locationTokyo
          locationJGD
          depth
          description
          magnitude
          landOrSea
          travelTimeTable {
            P
            S
            D
          }
        }
        serial
        isWarning
        isEnd
        isPlum
      }
      intensityForecastMaxInt
      intensityForecastAreaIntList
      intensityForecastStationIntList
      intensityObservationMaxInt
      intensityObservationAreaIntList
      intensityObservationCityIntList
      intensityObservationStationIntList
      warningComment {
        code
        text
        codeType
      }
      forecastComment {
        code
        text
        codeType
      }
      observationComment {
        code
        text
        codeType
      }
      varComment {
        code
        text
        codeType
      }
      freeFormComment
      createdAt
      updatedAt
    }
  }
`;
export const updateEvent = /* GraphQL */ `
  mutation UpdateEvent(
    $input: UpdateEventInput!
    $condition: ModelEventConditionInput
  ) {
    updateEvent(input: $input, condition: $condition) {
      id
      type
      targetTimestamp
      kind
      eventId
      status
      isTest
      isCanceled
      originTime
      arrivalTime
      tsunamiForecast {
        areaTsunamiList {
          code
          name
          levelCode
          firstHeight {
            arrivalTime
            condition
            initial
            height {
              condition
              description
              height
              addInfo
            }
          }
          maxHeight {
            dateTime
            condition
            height {
              condition
              description
              height
              addInfo
            }
          }
        }
        stationTsunamiList {
          code
          name
          area {
            code
            name
            levelCode
            firstHeight {
              arrivalTime
              condition
              initial
              height {
                condition
                description
                height
                addInfo
              }
            }
            maxHeight {
              dateTime
              condition
              height {
                condition
                description
                height
                addInfo
              }
            }
          }
          levelCode
        }
      }
      tsunamiObservation {
        stationTsunamiList {
          code
          name
          area {
            code
            name
            levelCode
            firstHeight {
              arrivalTime
              condition
              initial
              height {
                condition
                description
                height
                addInfo
              }
            }
            maxHeight {
              dateTime
              condition
              height {
                condition
                description
                height
                addInfo
              }
            }
          }
          levelCode
        }
      }
      earthquakeForecast {
        hypocenterTokyo {
          areaCode
          areaName
          locationTokyo
          locationJGD
          depth
          description
          magnitude
          landOrSea
          travelTimeTable {
            P
            S
            D
          }
        }
        hypocenterJGD {
          areaCode
          areaName
          locationTokyo
          locationJGD
          depth
          description
          magnitude
          landOrSea
          travelTimeTable {
            P
            S
            D
          }
        }
        serial
        isWarning
        isEnd
        isPlum
      }
      earthquakeObservation {
        hypocenterTokyo {
          areaCode
          areaName
          locationTokyo
          locationJGD
          depth
          description
          magnitude
          landOrSea
          travelTimeTable {
            P
            S
            D
          }
        }
        hypocenterJGD {
          areaCode
          areaName
          locationTokyo
          locationJGD
          depth
          description
          magnitude
          landOrSea
          travelTimeTable {
            P
            S
            D
          }
        }
        serial
        isWarning
        isEnd
        isPlum
      }
      intensityForecastMaxInt
      intensityForecastAreaIntList
      intensityForecastStationIntList
      intensityObservationMaxInt
      intensityObservationAreaIntList
      intensityObservationCityIntList
      intensityObservationStationIntList
      warningComment {
        code
        text
        codeType
      }
      forecastComment {
        code
        text
        codeType
      }
      observationComment {
        code
        text
        codeType
      }
      varComment {
        code
        text
        codeType
      }
      freeFormComment
      createdAt
      updatedAt
    }
  }
`;
export const deleteEvent = /* GraphQL */ `
  mutation DeleteEvent(
    $input: DeleteEventInput!
    $condition: ModelEventConditionInput
  ) {
    deleteEvent(input: $input, condition: $condition) {
      id
      type
      targetTimestamp
      kind
      eventId
      status
      isTest
      isCanceled
      originTime
      arrivalTime
      tsunamiForecast {
        areaTsunamiList {
          code
          name
          levelCode
          firstHeight {
            arrivalTime
            condition
            initial
            height {
              condition
              description
              height
              addInfo
            }
          }
          maxHeight {
            dateTime
            condition
            height {
              condition
              description
              height
              addInfo
            }
          }
        }
        stationTsunamiList {
          code
          name
          area {
            code
            name
            levelCode
            firstHeight {
              arrivalTime
              condition
              initial
              height {
                condition
                description
                height
                addInfo
              }
            }
            maxHeight {
              dateTime
              condition
              height {
                condition
                description
                height
                addInfo
              }
            }
          }
          levelCode
        }
      }
      tsunamiObservation {
        stationTsunamiList {
          code
          name
          area {
            code
            name
            levelCode
            firstHeight {
              arrivalTime
              condition
              initial
              height {
                condition
                description
                height
                addInfo
              }
            }
            maxHeight {
              dateTime
              condition
              height {
                condition
                description
                height
                addInfo
              }
            }
          }
          levelCode
        }
      }
      earthquakeForecast {
        hypocenterTokyo {
          areaCode
          areaName
          locationTokyo
          locationJGD
          depth
          description
          magnitude
          landOrSea
          travelTimeTable {
            P
            S
            D
          }
        }
        hypocenterJGD {
          areaCode
          areaName
          locationTokyo
          locationJGD
          depth
          description
          magnitude
          landOrSea
          travelTimeTable {
            P
            S
            D
          }
        }
        serial
        isWarning
        isEnd
        isPlum
      }
      earthquakeObservation {
        hypocenterTokyo {
          areaCode
          areaName
          locationTokyo
          locationJGD
          depth
          description
          magnitude
          landOrSea
          travelTimeTable {
            P
            S
            D
          }
        }
        hypocenterJGD {
          areaCode
          areaName
          locationTokyo
          locationJGD
          depth
          description
          magnitude
          landOrSea
          travelTimeTable {
            P
            S
            D
          }
        }
        serial
        isWarning
        isEnd
        isPlum
      }
      intensityForecastMaxInt
      intensityForecastAreaIntList
      intensityForecastStationIntList
      intensityObservationMaxInt
      intensityObservationAreaIntList
      intensityObservationCityIntList
      intensityObservationStationIntList
      warningComment {
        code
        text
        codeType
      }
      forecastComment {
        code
        text
        codeType
      }
      observationComment {
        code
        text
        codeType
      }
      varComment {
        code
        text
        codeType
      }
      freeFormComment
      createdAt
      updatedAt
    }
  }
`;
