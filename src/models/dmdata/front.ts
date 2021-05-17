import { EarthquakeAnnounceEvent, EarthquakeEvent, EarthquakeObservationEvent } from './models/earthquake/earthquake';
import { TsunamiEvent } from './models/earthquake/tsunami'
import { WeatherGeneralEvent } from './models/weather/general';
import { DmdataTelegramData, DmdataTelegramType, DmdataClassOptionType } from './telegram';

const dmdataService = (data: DmdataTelegramType, option?: DmdataClassOptionType) => {
  switch (data.head.type) {
    // EarthQuake
    case 'VXSE51':
    case 'VXSE52':
    case 'VXSE53':
    case 'VXSE61':
      {
        const event = new EarthquakeObservationEvent(data, option);
        event.send();
      }
      break;
    case 'VZSE40':
      {
        const event = new EarthquakeAnnounceEvent(data, option);
        event.send();
      }
      break;
    // Tsunami
    case 'VTSE51':
    case 'VTSE41':
      {
        const event = new TsunamiEvent(data, option);
        event.send();
      }
      break;

    // Weather
    case 'VPTI50':
    case 'VPTI51':
    case 'VPTI52':
    case 'VPZJ50':
    case 'VPCJ50':
    case 'VPFJ50':
    case 'VPFG50':
    // case 'VPZW50':
    case 'VPCW50':
    case 'VPFW50':
    case 'VPSG50':
    case 'VPZS50':
    case 'VMCJ50':
    case 'VMCJ51':
    case 'VMCJ52':
    case 'VMIC50':
    case 'VPCT50':
    case 'VPFT50':
    case 'VPZK70':
    case 'VPCK70':
      {
        const event = new WeatherGeneralEvent(data, option);
        event.send();
      }
      break;
    default:
      //
      {
        const event = new DmdataTelegramData(data, option);
        event.send();
      }
  }
  
};

export default dmdataService;
