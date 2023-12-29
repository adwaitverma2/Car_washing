const questions = [
    {
        title: 'What type of company do you represent?',
        inputs: [
            'A software product company developing software to be distributed commercially',
            'An organization developing software for internal or business use An innovative startup',
            'An innovative startup',
            'Others (please specify)'
        ],
        multiselect:false

    },
    {
        title: 'What stage of development are you at?',
        inputs: [
            'Starting the development soon',
            'MVP, software under development',
            'Software is fully launched',
            'Others (please specify)'
        ],
        multiselect:true
    },
    {
        title: 'How would you describe your current development infrastructure?',
        inputs: [
            'On-premises',
            'Cloud',
            'Hybrid'
        ],
        multiselect:false
    },
    {
        title: 'What cloud platform do you use?',
        inputs: [
            'Microsoft Azure ',
            'Amazon Web Services (AWS)',
            'Google Cloud Platform (GCP)',
            'Alibaba Cloud',
            'DigitalOcean',
            'Oracle Cloud DigitalOcean',
        ],
        multiselect:false
    },
    {
        title: 'What challenges are you facing',
        inputs: [
            'Lack of collaboration among QA, development, and operation teams',
            'Rare or slow deployments', 
            'Insufficient automation',
            'Inconsistencies in infrastructure configurations in development, testing, and production',
            'Testing is not integrated into CI/CD',
            'Too many defects in production',
            'Frequent failures after changes ',
            'Lack of a system to monitor software and infrastructure performance', 
            'Security vulnerabilities',
        ],
        multiselect:true
    },
    {
        title: '*What is the best way to describe your current needs? ',
        inputs: [
            'I need DevOps consulting',
            'I need someone to set up DevOps from scratch',
            'I need continuous management and optimization of the entire DevOps process or its component'
        ],
        multiselect:false
    },
    {
        title: 'What kind of DevOps consulting services do you need?',
        inputs: [
            'DevOps training for the in-house team',
            'Guidance during DevOps setup',
            'Assistance with technology selection', 
            'Help with adapting legacy software to DevOps',
            'I need a detailed DevOps roadmap for every stage of my app’s lifecycle'
        ],
        multiselect:false
    },
    {
        title: 'What DevOps components do you need assistance with?',
        inputs: [
            'IaC (Infrastructure as Code)',
'CI/CD pipelines',
'DevSecOps', 
'Monitoring and logging', 
'Configuration management', 
'Containerization and orchestratio',
'Test automation'
        ],
        multiselect:false
    },
    {
        title: '*Are there any particular DevOps tools and technologies you’d like to apply?',
        inputs: [
            'No',
            'Yes (please specify)'        
        ],
        multiselect:false
    },
    {
        title: '*What schedule for DevOps engineers would best suit your needs?',
        inputs: [
            'Not sure',
            '24/7',
           '12/7',
            '12/5',
            '8/7',
           '8/5',
           'On-demand',
            'Others (please specify)'      
        ],
        multiselect:false
    }, 
];

const questionsContainer = document.querySelector('#questions');
const nextButton = document.getElementById('nextButton');
const backButton = document.getElementById('backButton');

const contactDetails = document.getElementById('contactDetails');
const lastPage = document.getElementById('lastPage');
const submitButton = document.getElementById('submitButton');
const fullNameInput = document.getElementById('fullName');
const companyNameInput = document.getElementById('companyName');
const workEmailInput = document.getElementById('workEmail');
const finalFullName = document.getElementById('finalFullName');
const finalCompanyName = document.getElementById('finalCompanyName');
const finalWorkEmail = document.getElementById('finalWorkEmail');
let currentQuestion = 0;

const userResponses = []; 

function renderQuestions(startIndex) {
  questionsContainer.innerHTML = '';

  for (let i = startIndex; i < Math.min(startIndex + 2, questions.length); i++) {
    const question = questions[i];
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('client-section');
    questionDiv.innerHTML = `<h2>${question.title}</h2>`;

    question.inputs.forEach((inputText, inputIndex) => {
      const inputId = `question${i + 1}-input${inputIndex + 1}`;
      if (question.multiselect) {
        if (inputText === 'Others (please specify)') {
          questionDiv.innerHTML += `
            <div class="input-container">
              <input type="checkbox" id="${inputId}" name="question${i + 1}" value="${inputText}">
              <label for="${inputId}">${inputText}</label>
              <input type="text" class="other-input" id="otherInput${i + 1}" name="otherInput${i + 1}">
            </div>
          `;
        } else {
          questionDiv.innerHTML += `
            <div class="input-container">
              <input type="checkbox" id="${inputId}" name="question${i + 1}" value="${inputText}">
              <label for="${inputId}">${inputText}</label>
            </div>
          `;
        }
      } else {
        if (inputText === 'Others (please specify)') {
          questionDiv.innerHTML += `
            <div class="input-container">
              <input type="radio" id="${inputId}" name="question${i + 1}" value="${inputText}">
              <label for="${inputId}">${inputText}</label>
              <input type="text" class="other-input" id="otherInput${i + 1}" name="otherInput${i + 1}">
            </div>
          `;
        } else {
          questionDiv.innerHTML += `
            <div class="input-container">
              <input type="radio" id="${inputId}" name="question${i + 1}" value="${inputText}">
              <label for="${inputId}">${inputText}</label>
            </div>
          `;
        }
      }
    });

    questionsContainer.appendChild(questionDiv);
  }
}

function handleInputChange(event) {
    const { name, value, checked } = event.target;
    const otherInput = document.querySelector(`#otherInput${name.charAt(name.length - 1)}`);
  
    if (checked) {
      if (value === 'Others (please specify)') {
        otherInput.style.display = 'inline-block';
        otherInput.addEventListener('input', function() {
          const checkboxValue = this.previousElementSibling.value;
          const newValue = this.value ? `${checkboxValue}: ${this.value}` : checkboxValue;
          userResponses.push({ question: name, value: newValue });
          console.log(userResponses);
        });
      } else {
        if (userResponses.some(response => response.question === name)) {
          const index = userResponses.findIndex(response => response.question === name);
          userResponses.splice(index, 1);
        }
        userResponses.push({ question: name, value });
        console.log(userResponses);
      }
    }
  }
  
  

function showNextQuestions() {
    if(currentQuestion===questions.length-2){
        showLastPage()
    }
  currentQuestion += 2;
  renderQuestions(currentQuestion);
}

function showPreviousQuestions() {
  currentQuestion -= 2;
  if (currentQuestion < 0) {
    currentQuestion = 0;
  }
  renderQuestions(currentQuestion);
}

function showLastPage() {
    lastPage.style.display = 'block';
    questionsContainer.innerHTML = ''; // Clear previous questions if needed
    contactDetails.style.display = 'none';
    finalFullName.textContent = fullNameInput.value;
    finalCompanyName.textContent = companyNameInput.value;
    finalWorkEmail.textContent = workEmailInput.value;
    renderQuestions(currentQuestion);
  }

  function saveFormData(e) {
    e.preventDefault();
    const contactInfo = {
      fullName: fullNameInput.value,
      companyName: companyNameInput.value,
      workEmail: workEmailInput.value
    };
  
    console.log('Contact Details:', contactInfo);
    console.log('User Responses:', userResponses);
  }


nextButton.addEventListener('click', showNextQuestions);
backButton.addEventListener('click', showPreviousQuestions);
submitButton.addEventListener('click', saveFormData);
questionsContainer.addEventListener('change', handleInputChange);

renderQuestions(currentQuestion);




