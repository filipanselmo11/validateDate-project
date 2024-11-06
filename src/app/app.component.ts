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
    endDate: ''
  };

  minEndDate = '';

  formErrors = {
    startDate: { valid: true, message: ''},
    endDate: { valid: true, message: ''},
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
}
