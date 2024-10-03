import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Data } from '../../models/data'
import { Device } from '../../models/device'
import { DeviceService } from '../../services/device.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css']
})
export class DeviceListComponent implements OnInit {

  deviceList = new Array<Device>()
  device = new Device()
  data = new Data()
  @Input() name: string = '';
  @Input() price: number = 0;
  @Input() color: string = '';
  @Input() generation: string = '';
  @Input() Capacity: number = 0;
  @Input() id2: string = '';
  @Input() name2: string = '';
  @Input() price2: number = 0;
  @Input() color2: string = '';
  @Input() generation2: string = ''
  @Input() Capacity2: number = 0;
  @ViewChild('see') see: any;

  // Constructor que inyecta el servicio de dispositivos y el servicio de modales
  constructor(private deviceService: DeviceService, private modalService: NgbModal) { }

  // Método del ciclo de vida que se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.getAll()
  }

  // Método que obtiene la lista de dispositivos desde el servicio
  getAll() {
    this.deviceService.getAll().subscribe(response => {
      this.deviceList = response
      this.clearInputs()
    }, error => {
      console.log(error)
    })
  }

  // Método para guardar un nuevo dispositivo
  save() {
    this.device.name = this.name
    this.data.price = this.price
    this.data.color = this.color
    this.data.generation = this.generation;
    this.data.Capacity = this.Capacity;
    this.device.data = this.data
    this.deviceService.save(this.device).subscribe(response => {
      this.insertTr(response)
    }, error => {
      console.log(error)
    })
  }

  // Método para eliminar un dispositivo por su ID
  delete(id: string) {
    this.deviceService.delete(id).subscribe(() => {
      document.getElementById(id)?.remove()
      this.clearInputs()
    })
  }

  // Método para ver y editar un dispositivo en un modal
  view(see: any, device: Device) {
    this.id2 = device.id
    this.name2 = device.name
    this.price2 = device.data.price
    this.color2 = device.data.color
    this.generation2 = device.data.generation
    this.Capacity2 = device.data.Capacity
    this.modalService.open(see).result.then(() => {
      this.device.id = this.id2
      this.device.name = this.name2
      this.data.price = this.price2
      this.data.color = this.color2
      this.data.generation = this.generation2
      this.data.Capacity = this.Capacity2
      this.device.data = this.data
      this.deviceService.update(this.device).subscribe((response) => {
        document.getElementById(response.id)?.remove()
        this.insertTr(response)
      }, error => {
        console.log(error)
      })
    })
  }

  // Método para verificar si un objeto tiene una propiedad específica
  hasProp(d: Data, name: string) {
    return d.hasOwnProperty(name)
  }

  // Método para insertar una nueva fila en la tabla de dispositivos
  insertTr(response: Device) {
    var tbody = document.getElementsByTagName('tbody')[0];
    var row = tbody.insertRow();
    row.setAttribute('id', response.id);

    var cell = row.insertCell();
    cell.innerHTML = response.id;

    cell = row.insertCell();
    cell.innerHTML = response.name;

    cell = row.insertCell();
    cell.innerHTML = response.data.price ? response.data.price.toString() : 'N/A';

    cell = row.insertCell();
    cell.innerHTML = response.data.color || 'N/A';

    cell = row.insertCell();
    cell.innerHTML = response.data.generation || 'N/A'; 

    cell = row.insertCell();
    cell.innerHTML = response.data.Capacity ? response.data.Capacity.toString() : 'N/A';

    cell=row.insertCell();
    var button = document.createElement('button');
    button.innerHTML = "VIEW";
    button.addEventListener('click', () => { this.view(this.see, response); });
    cell.appendChild(button);

    cell = row.insertCell();
    button = document.createElement('button');
    button.innerHTML = "DELETE";
    button.addEventListener('click', () => { this.delete(response.id); });
    cell.appendChild(button);

    this.clearInputs();
  }

  // Método para limpiar los campos de entrada
  clearInputs() {
    document.getElementsByTagName('input')[0].value = ''
    document.getElementsByTagName('input')[1].value = ''
    document.getElementsByTagName('input')[2].value = ''
    document.getElementsByTagName('input')[3].value = ''
    document.getElementsByTagName('input')[45].value = ''
    document.getElementsByTagName('input')[0].focus()
  }
}