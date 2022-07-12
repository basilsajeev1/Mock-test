function viewQuestions(examId){
    $.ajax({
        url: '/view-questions'+examId,
        method: 'get',
        success:()=>{
            
        }

    })
}