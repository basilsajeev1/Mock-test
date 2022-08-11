

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

function addEssayPage(examId){
    window.location.href="/admin/add-essay/"+examId
}

function editEssay(qId){
    window.location.href="/admin/edit-essay"+qId
}

function deleteEssay(qId){
    $.ajax({
        url:'/admin/delete-essay'+qId,
        method:'get',
        success:(response)=>{
            if(response.status){
                alert('Deleted Essay successfully')
                location.reload()
            }
        }
    })
}

function examDetails(examId){
    window.location.href="/exam-info"+examId
}

function startExam(examId){
    window.location.href="/exam"+examId
}


function startTimer(time){  
    let totalTime= time*60   
    const countdownEl= document.getElementById('countdown')
    setInterval(updateCountdown,1000)

              
    function updateCountdown()
        {
            
            
            let minutes=Math.floor(totalTime/60);
            let seconds = totalTime % 60;
            seconds=seconds < 10 ? '0' +seconds : seconds;
            if(minutes==0 && seconds==0)
            {
                clearInterval()
                submitForm()
            }else
            {
                countdownEl.innerHTML = minutes +":"+ seconds
                totalTime--
            }
            
        }

        function submitForm(){
            document.getElementById('examForm').submit()
        }
}
