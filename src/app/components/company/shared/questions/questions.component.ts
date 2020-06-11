import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service'
import { Pregunta } from 'src/app/models/preguntas/pregunta'

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  pregunta = {} as Pregunta
  question: {
  };
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }
  addQuestion(questionForm: NgForm) {  
    this.authService.setQuestion(questionForm.value)
    this.pregunta = {} as Pregunta
  }

}
