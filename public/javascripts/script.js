
function viewQuestions(examId){
    
    window.location.href="/admin/view-questions/"+examId
}

function addMcqPage(examId){
    window.location.href="/admin/add-mcq/"+examId
}

function deleteExam(examId){
    $.ajax({
        url:'/admin/delete-exam/'+examId,
        method: 'get',
        success:(response)=>{
            if(response.status){
                alert('Deleted exam successfully')
                location.reload()
            }
        }
    })
}

function editMcq(qId){
    window.location.href="/admin/edit-mcq"+qId
}

function deleteMcq(qId){
    $.ajax({
        url:'/admin/delete-mcq'+qId,
        method:'get',
        success:(response)=>{
            if(response.status){
                alert('Deleted MCQ successfully')
                location.reload()
            }
        }
    })
}
