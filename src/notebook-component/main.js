import { controller } from './controller.js';
import { Calification } from './calification.js';

const notebookData = JSON.parse(localStorage.getItem('notebook'));

if (notebookData) {   
    if (Array.isArray(notebookData.califications)) {
        controller.notebook.califications = notebookData.califications.map(
            c => new Calification(c.weight, c.score))
    }
    const examData = notebookData.exam;
    controller.notebook.exam = new Calification(examData.weight, examData.score)
}
    
document.addEventListener('DOMContentLoaded', controller.init.bind(controller));