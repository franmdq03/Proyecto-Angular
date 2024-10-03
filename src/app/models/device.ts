import { Data } from './data';

export class Device {
    id: string = '';    // Inicializar con un valor por defecto
    name: string = '';  // Inicializar con un valor por defecto
    data: Data = new Data();  // Inicializar con una nueva instancia de Data
}