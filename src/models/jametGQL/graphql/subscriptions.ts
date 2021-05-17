/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onMutateEvent = /* GraphQL */ `
  subscription OnMutateEvent {
    onMutateEvent {
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
export const onCreateEvent = /* GraphQL */ `
  subscription OnCreateEvent {
    onCreateEvent {
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
export const onUpdateEvent = /* GraphQL */ `
  subscription OnUpdateEvent {
    onUpdateEvent {
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
export const onDeleteEvent = /* GraphQL */ `
  subscription OnDeleteEvent {
    onDeleteEvent {
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
