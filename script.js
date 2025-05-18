const formTitleInput = document.getElementById("formTitle");
const formBgColorInput = document.getElementById("formBgColor");
const formBorderColorInput = document.getElementById("formBorderColor");
const fieldLabelInput = document.getElementById("fieldLabel");
const fieldTypeSelect = document.getElementById("fieldType");
const fieldOptionsInput = document.getElementById("fieldOptions");
const optionInputsDiv = document.getElementById("optionInputs");
const addFieldBtn = document.getElementById("addFieldBtn");
const generatedForm = document.getElementById("generatedForm");

// Atualiza o título do formulário dinamicamente
formTitleInput.addEventListener("input", () => {
  let titleEl = document.getElementById("formTitlePreview");

  if (!titleEl) {
    titleEl = document.createElement("h3");
    titleEl.id = "formTitlePreview";
    titleEl.className = "text-center mb-4";
    generatedForm.prepend(titleEl);
  }

  titleEl.textContent = formTitleInput.value;
});

// Atualiza a cor de fundo
formBgColorInput.addEventListener("input", () => {
  generatedForm.style.backgroundColor = formBgColorInput.value;
});

// Atualiza a cor da borda
formBorderColorInput.addEventListener("input", () => {
  generatedForm.style.border = `2px solid ${formBorderColorInput.value}`;
  generatedForm.style.borderRadius = "10px";
  generatedForm.style.padding = "20px";
});

// Exibe o campo de opções somente se for radio ou select
fieldTypeSelect.addEventListener("change", () => {
  const selectedType = fieldTypeSelect.value;
  if (selectedType === "radio" || selectedType === "select") {
    optionInputsDiv.style.display = "block";
  } else {
    optionInputsDiv.style.display = "none";
    fieldOptionsInput.value = "";
  }
});

// Adiciona novo campo
addFieldBtn.addEventListener("click", () => {
  const labelText = fieldLabelInput.value.trim();
  const fieldType = fieldTypeSelect.value;
  const optionsText = fieldOptionsInput.value.trim();

  if (!labelText) {
    alert("Digite um nome para o campo.");
    return;
  }
  const fieldWrapper = document.createElement("div");
  // Adiciona classes ao wrapper
  fieldWrapper.className = "mb-3 position-relative"; 
  
  const botaoDeEditarLabel = document.createElement("button");
  // Configurando o botão de editar
  botaoDeEditarLabel.className = "btn btn-sm btn-outline-primary me-1";
  botaoDeEditarLabel.type = "button";
  botaoDeEditarLabel.style.position = "absolute";
  botaoDeEditarLabel.style.right = "40px"; 
  botaoDeEditarLabel.style.top = "0";
  
  const botaoDeDeletar = document.createElement("button");
  // Configurando o botão de deletar
  botaoDeDeletar.className = "btn btn-sm btn-outline-danger";
  botaoDeEditarLabel.type = "button";
  botaoDeDeletar.style.position = "absolute";
  botaoDeDeletar.style.right = "0";
  botaoDeDeletar.style.top = "0";


  botaoDeDeletar.addEventListener("click", (event)=>{
    event.preventDefault()
    event.stopPropagation()
    event.target.closest("div").remove()
  })

  botaoDeEditarLabel.addEventListener("click", (event)=>{
    event.preventDefault()
    event.stopPropagation()

    const closestLabel= event.target.parentElement.querySelector("label")

    closestLabel.style.display = "none"


    const editarLabel = document.createElement("input")
    editarLabel.type = "text"
    editarLabel.value = closestLabel.textContent
    editarLabel.className= "form-control"

    closestLabel.parentElement.insertBefore(editarLabel, closestLabel)

    editarLabel.focus()

    editarLabel.addEventListener("keydown", (event)=>{
      if(event.key === "Enter"){
        closestLabel.textContent = editarLabel.value
        editarLabel.remove()

        closestLabel.style.display = ""


      }
    })

  })
  
  // Adiciona os botões ao wrapper
  fieldWrapper.appendChild(botaoDeEditarLabel);
  fieldWrapper.appendChild(botaoDeDeletar);

  const label = document.createElement("label"); // <label> </label>
  label.textContent = labelText; // <label> Nome: </label>
  label.className = "form-label"; // <label class= "form-label"> Nome: </label>

  fieldWrapper.appendChild(label);


  if (fieldType === "text" || fieldType === "email" || fieldType === "date") {
    const input = document.createElement("input"); // <input></input>
    input.type = fieldType; // <input type="text"></input>
    input.className = "form-control"; // <input type="text" class="form-control"></input>
    fieldWrapper.appendChild(input);

      /*
      <div class="mb-3">
          <label class= "form-label"> Nome: </label>
          <input type="text" class="form-control"></input>
      </div>
  */

      input.addEventListener("keydown", (e)=>{
        if(e.key === "Enter"){
          e.preventDefault()
          e.stopPropagation()
        }
      })

  } else if (fieldType === "radio") {
    if (!optionsText) {
      alert("Digite ao menos uma opção separada por vírgula.");
      return;
    }

    const options = optionsText.split(",").map(opt => opt.trim());

 
    options.forEach(opt => {
      const radioDiv = document.createElement("div");
      radioDiv.className = "form-check";

      const radioInput = document.createElement("input");
      radioInput.type = "radio";
      radioInput.name = labelText;
      radioInput.className = "form-check-input";
      

      radioInput.addEventListener("keydown", (e)=>{
        if(e.key === "Enter"){
          e.preventDefault()
          e.stopPropagation()
        }
      })

      const radioLabel = document.createElement("label");
      radioLabel.className = "form-check-label";
      radioLabel.textContent = opt;

      radioDiv.appendChild(radioInput);
      radioDiv.appendChild(radioLabel);
      fieldWrapper.appendChild(radioDiv);
    });

  } else if (fieldType === "select") {
    if (!optionsText) {
      alert("Digite ao menos uma opção separada por vírgula.");
      return;
    }

    const select = document.createElement("select");
    select.className = "form-select";
    

    const options = optionsText.split(",").map(opt => opt.trim());
    options.forEach(opt => {
      const option = document.createElement("option");
      option.textContent = opt;
      select.appendChild(option);
    });

    fieldWrapper.appendChild(select);
  }

  generatedForm.appendChild(fieldWrapper);

  // Limpa os campos
  fieldLabelInput.value = "";
  fieldTypeSelect.value = "text";
  fieldOptionsInput.value = "";
  optionInputsDiv.style.display = "none";


});
