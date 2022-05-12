import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
interface Quiz{
    country: string;
    question: string;
    answer: { option: string, correct: boolean } [];
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  quizzes: Quiz[] = [
    {
      country:'Somalia',
      question: 'Cual es la capital de Somalia',
      answer: [
        { option: 'Nairobi', correct: false },
        { option: 'Asmara', correct: false },
        { option: 'Mogadishu', correct: true },
        { option: 'Addis Ababa', correct: false },
      ]
    },
    {
      country:'Mexico',
      question: 'Cual es la capital de Mexico',
      answer: [
        { option: 'Guadalajara City', correct: false },
        { option: 'Puebla City', correct: false },
        { option: 'Mexico City', correct: true },
        { option: 'Cancún', correct: false },
      ]
    },
    {
      country:'United Kingdom',
      question: 'Cual es la capital de UK',
      answer: [
        { option: 'London', correct: true },
        { option: 'Asmara', correct: false },
        { option: 'Paris', correct: false },
        { option: 'Berlin', correct: false }
      ]
    },
    {
      country:'United States',
      question: 'Cual es la capital de USA',
      answer: [
        { option: 'Los Angeles', correct: false },
        { option: 'New York', correct: false },
        { option: 'Washington DC', correct: true },
        { option: 'Boston', correct: false }
      ]
    },
    {
      country:'United Arab Emirates',
      question: 'Cual es la capital de EUA',
      answer: [
        { option: 'Dubai', correct: false },
        { option: 'Abu Dhabi', correct: true },
        { option: 'Doha', correct: false },
        { option: 'Riyadh', correct: false }
      ]
    },
    {
      country:'Japan',
      question: 'Cual es la capital de Japon',
      answer: [
        { option: 'Osaka', correct: false },
        { option: 'Seoul', correct: false },
        { option: 'Tokyo', correct: true },
        { option: 'Pyongyang', correct: false }
      ]
    },
    {
      country:'South Africa',
      question: 'Cual es la capital de Sud Africa',
      answer: [
        { option: 'Maputo', correct: false },
        { option: 'Johannesburg', correct: false },
        { option: 'Pretoria', correct: true },
        { option: 'Cape Town', correct: false }
      ]
    },
    {
      country:'Brazil',
      question: 'Cual es la capital de Brasil',
      answer: [
        { option: 'Buenos Aires', correct: false },
        { option: 'Sao Paulo', correct: false },
        { option: 'Brasília', correct: true },
        { option: 'Rio de Janeiro', correct: false },
      ]
    },
    {
      country:'Jamaica',
      question: 'Cual es la capital de Jamaica',
      answer: [
        { option: 'Brasília', correct: false },
        { option: 'Portmore ', correct: false },
        { option: 'Asunción', correct: true },
        { option: 'Saint Carine ', correct: false }
      ]
    },
    {
      country:'Cuba',
      question: 'Cual es la capital de Cuba',
      answer: [
        { option: 'Montevideo', correct: false },
        { option: 'Santa Clara', correct: false },
        { option: 'Havana', correct: true },
        { option: 'Camagüey', correct: false }
      ]
    }
  ]

  getQuizzes(){
    return this.quizzes;
  }
}
