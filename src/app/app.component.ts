import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'validateDate-project';

  modalData = {
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: ''
  };

  minEndDate = '';
  minStartTime = '';
  minEndTime = '';


  formErrors = {
    startDate: { valid: true, message: ''},
    endDate: { valid: true, message: ''},
    startTime: { valid: true, message: ''},
    endTime: {valid: true, message: ''},
  };

  minDate: string = '';

  ngOnInit(): void {
    const currentDate = new Date();
    this.minDate = currentDate.toISOString().split('T')[0];
  }

  validateDate(type: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (type === 'start') {
      this.modalData.startDate = value;
      // Atualiza a data mínima permitida para o fim
      this.minEndDate = this.modalData.startDate;
    } else if (type === 'end') {
      this.modalData.endDate = value;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    // Validação de data para mostrar erros
    if (type === 'start' && value < currentDate) {
      this.formErrors.startDate = { valid: false, message: 'A data de início não pode ser anterior a hoje.' };
    } else if (type === 'end' && value < this.modalData.startDate) {
      this.formErrors.endDate = { valid: false, message: 'A data de fim não pode ser anterior à data de início.' };
    } else {
      if (type === 'start') {
        this.formErrors.startDate = { valid: true, message: '' };
      } else if (type === 'end') {
        this.formErrors.endDate = { valid: true, message: '' };
      }
    }
  }

  validateTime(type: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Limita o valor a 5 caracteres no formato HH:MM
    if (value.length > 5) {
      value = value.slice(0, 5);
    }

    // Atualiza o valor do campo e o modelo Angular
    input.value = value;
    if (type === 'start') {
      this.modalData.startTime = value;
    } else if (type === 'end') {
      this.modalData.endTime = value;
    }

    // Variáveis para obter o horário atual e a data de hoje
    const currentDate = new Date();
    const currentTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
    const today = currentDate.toISOString().split('T')[0];

    // Validação para o horário de início
    if (type === 'start') {
      if (this.modalData.startDate === today && value < currentTime) {
        // Caso a data seja hoje, o horário de início não pode ser anterior ao horário atual
        this.formErrors.startTime = { valid: false, message: 'O horário de início não pode ser anterior ao horário atual.' };
      } else {
        this.formErrors.startTime = { valid: true, message: '' };
      }
    }

    // Validação para o horário de fim
    if (type === 'end') {
      const isSameDay = this.modalData.endDate === this.modalData.startDate;

      if (isSameDay && value <= this.modalData.startTime) {
        // Caso a data de fim seja a mesma do início, o horário de fim deve ser posterior ao horário de início
        this.formErrors.endTime = { valid: false, message: 'O horário de fim deve ser posterior ao horário de início.' };
      } else {
        this.formErrors.endTime = { valid: true, message: '' };
      }
    }
  }

}
