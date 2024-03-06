const surveyQuestions = [
  {
       section: "Phần 1: Kiến thức cơ bản",
       questions: Array.from({ length: 10 }, (_, i) => ({
           type: "trueOrFalse",
           question: `Câu hỏi 1: Bạn có thể đi bộ không?`,
           options: [
               { label: "Có", value: "true" },
               { label: "Không", value: "false" }
           ]
       }))
  },
  {
       section: "Phần 2: Lựa chọn đơn",
       questions: Array.from({ length: 10 }, (_, i) => ({
           type: "singleChoice",
           question: `Câu hỏi 2: Bạn thích đồ ăn gì nhất?`,
           options: [
               { label: "Pizza", value: "option1" },
               { label: "Sushi", value: "option2" },
               { label: "Bánh mì", value: "option3" },
               { label: "Không thích ăn", value: "option4" }
           ]
       }))
  },
  {
       section: "Phần 3: Lựa chọn nhiều",
       questions: Array.from({ length: 10 }, (_, i) => ({
           type: "multipleChoice",
           question: `Câu hỏi 3: Bạn thích thể thao gì?`,
           options: [
               { label: "Bóng đá", value: "option1" },
               { label: "Bơi lội", value: "option2" },
               { label: "Chạy bộ", value: "option3" },
               { label: "Yoga", value: "option4" }
           ]
       }))
  },
  {
       section: "Phần 4: Câu trả lời mở",
       questions: Array.from({ length: 10 }, (_, i) => ({
           type: "openAnswer",
           question: `Câu hỏi 4: Bạn muốn trở thành gì khi lớn lên?`,
           options: []
       }))
  }
 ];

function displaySurveyQuestions() {
  const surveyContainer = document.querySelector('.survey-container');
  surveyQuestions.forEach(section => {
      const sectionElement = document.createElement('div');
      sectionElement.classList.add('section');

      const sectionTitle = document.createElement('h1');
      sectionTitle.textContent = section.section;
      sectionElement.appendChild(sectionTitle);

      section.questions.forEach(question => {
          const questionElement = document.createElement('p');
          questionElement.textContent = question.question;
          questionElement.classList.add('question'); 
          sectionElement.appendChild(questionElement);

          if (question.type === "trueOrFalse" || question.type === "singleChoice") {
              question.options.forEach(option => {
                  const radioInput = document.createElement('input');
                  radioInput.type = "radio";
                  radioInput.name = question.question;
                  radioInput.value = option.value;
                  radioInput.id = `q${question.question.replace(/\s/g, '')}${option.value}`;

                  const label = document.createElement('label');
                  label.htmlFor = radioInput.id;
                  label.textContent = option.label;

                  sectionElement.appendChild(radioInput);
                  sectionElement.appendChild(label);
                  sectionElement.appendChild(document.createElement('br')); 
              });
          } else if (question.type === "multipleChoice") {
              question.options.forEach(option => {
                  const checkboxInput = document.createElement('input');
                  checkboxInput.type = "checkbox";
                  checkboxInput.name = question.question;
                  checkboxInput.value = option.value;
                  checkboxInput.id = `q${question.question.replace(/\s/g, '')}${option.value}`;

                  const label = document.createElement('label');
                  label.htmlFor = checkboxInput.id;
                  label.textContent = option.label;

                  sectionElement.appendChild(checkboxInput);
                  sectionElement.appendChild(label);
                  sectionElement.appendChild(document.createElement('br')); 
              });
          } else if (question.type === "openAnswer") {
              const textarea = document.createElement('textarea');
              textarea.name = question.question;
              textarea.rows = "5";
              textarea.cols = "110";
              sectionElement.appendChild(textarea);
          }
      });
      surveyContainer.appendChild(sectionElement);
  });
}

document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('resultBox').classList.add('hidden');
  document.getElementById('dialog').classList.remove('hidden');


  document.getElementById('infoForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const name = document.getElementById('name').value;
      const dob = document.getElementById('dob').value;
      const idCard = document.getElementById('idCard').value;
      const address = document.getElementById('address').value;


      document.getElementById('dialog').classList.add('hidden');
      document.getElementById('survey').classList.remove('hidden');

      displaySurveyQuestions();
  });
});

function getSurveyAnswers() {
  let answers = [];
  surveyQuestions.forEach(section => {
      section.questions.forEach(question => {
          if (question.type === "trueOrFalse" || question.type === "singleChoice") {
              const selectedOption = document.querySelector(`input[name="${question.question}"]:checked`);
              if (selectedOption) {
                  const label = question.options.find(option => option.value === selectedOption.value).label;
                  answers.push({ question: question.question, answer: label });
              }
          } else if (question.type === "multipleChoice") {
              const selectedOptions = document.querySelectorAll(`input[name="${question.question}"]:checked`);
              selectedOptions.forEach(option => {
                  const label = question.options.find(opt => opt.value === option.value).label;
                  answers.push({ question: question.question, answer: label });
              });
          } else if (question.type === "openAnswer") {
              const textarea = document.querySelector(`textarea[name="${question.question}"]`);
              if (textarea && textarea.value.trim() !== '') {
                  answers.push({ question: question.question, answer: textarea.value });
              }
          }
      });
  });
  return answers;
}

document.getElementById('submitSurvey').addEventListener('click', function() {
  document.getElementById('survey').classList.add('hidden');
  document.getElementById('resultBox').classList.remove('hidden');

  const resultText = document.getElementById('resultText');
  const name = document.getElementById('name').value;
  const dob = document.getElementById('dob').value;
  const idCard = document.getElementById('idCard').value;
  const address = document.getElementById('address').value;

  let result = `Thông tin tiểu sử:<br>- Họ và tên: ${name}<br>- Ngày tháng năm sinh: ${dob}<br>- Căn cước công dân: ${idCard}<br>- Địa chỉ thường trú: ${address}<br><br>Các lựa chọn đáp án:<br>`;


  resultText.innerHTML = result;
});