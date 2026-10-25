import {defineStore} from 'pinia'
import {ref} from 'vue'
import type { Question,NewQuestion } from '@/types/exam'
import DataService from '@/services/DataService'


export const useQuestionStore = defineStore('question',()=>{
    const questions = ref<Question[]>([])
    const isLoaded = ref(false)
    
    async function loadQuestions(){
        try{
            const response = await DataService.getData()
            questions.value= response.data.questions
            isLoaded.value=true
        } catch(error){
            console.log(error)
        }
            
    }
    function getQuestionsByLevel(levelId:number): Question[]{
        return questions.value.filter((question)=> question.level_id === levelId)
    }

    function addQuestion(payload:NewQuestion){
        let newId=1
        if(questions.value.length>0){
            newId = Math.max(...questions.value.map((question)=>question.id))+1
        }
        questions.value.push({id:newId,...payload})
    }
    return {questions,isLoaded,loadQuestions,getQuestionsByLevel,addQuestion}

})




