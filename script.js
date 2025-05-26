// Variáveis do formulário
const formTitleInput = document.getElementById("formTitle");
const formBgColorInput = document.getElementById("formBgColor");
const formBorderColorInput = document.getElementById("formBorderColor");
const fieldLabelInput = document.getElementById("fieldLabel");
const fieldTypeSelect = document.getElementById("fieldType");
const fieldOptionsInput = document.getElementById("fieldOptions");
const optionInputsDiv = document.getElementById("optionInputs");
const addFieldBtn = document.getElementById("addFieldBtn");
const generatedForm = document.getElementById("generatedForm");

// Variáveis do header
const mainHeader = document.getElementById("mainHeader"); // O header principal da página
const headerContent = document.getElementById("headerContent"); // Nova div para o conteúdo do header
const headerTitleActual = document.getElementById("headerTitleActual"); // O H1 dentro do header principal
const headerImageActualMain = document.getElementById("headerImageActual"); // A imagem dentro do header principal

const headerTitleInput = document.getElementById("headerTitle");
const headerBgColorInput = document.getElementById("headerBgColor");
const headerTextColorInput = document.getElementById("headerTextColor");
const headerFontSizeInput = document.getElementById("headerFontSize");
const headerImageInput = document.getElementById("headerImage");



// Variáveis do menu
const menuPreview = document.getElementById("menuPreview");
const menuList = document.getElementById("menuList");
const menuBgColorInput = document.getElementById("menuBgColor");
const menuItemTextColorInput = document.getElementById("menuItemTextColor");
const addMenuItemBtn = document.getElementById("addMenuItemBtn");
const menuItemTextInput = document.getElementById("menuItemText");
const menuItemUrlInput = document.getElementById("menuItemUrl");
const menuItemsContainer = document.getElementById("menuItemsContainer");

// Variáveis da galeria
const galleryPreview = document.getElementById("galleryPreview");
const galleryCardsPreviewContainer = document.getElementById("galleryCardsPreviewContainer");
const galleryAddItemBtn = document.getElementById("addGalleryCardBtn");
const galleryImageUrlInput = document.getElementById("galleryImageUrl");
const galleryCardTitleInput = document.getElementById("galleryCardTitle");
const galleryCardDescriptionInput = document.getElementById("galleryCardDescription");
const galleryBgColorInput = document.getElementById("galleryBgColor");
const galleryCardsContainer = document.getElementById("galleryCardsContainer");


// Variáveis do footer
const mainFooter = document.getElementById("mainFooter"); // O footer principal da página
const footerTextActual = document.getElementById("footerTextActual"); // O P dentro do footer principal

const footerText = document.getElementById("footerText");
const footerBgColorInput = document.getElementById("footerBgColor");
const footerTextColorInput = document.getElementById("footerTextColor");



// Variáveis de Gerenciamento de HTML
const showHtmlBtn = document.getElementById("showHtmlBtn");
const saveHtmlBtn = document.getElementById("saveHtmlBtn");
const loadHtmlBtn = document.getElementById("loadHtmlBtn");
const clearLocalStorageBtn = document.getElementById("clearLocalStorageBtn");
const generatedHtmlOutput = document.getElementById("generatedHtmlOutput");

// --- Editor de Formulário ---
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

formBgColorInput.addEventListener("input", () => {
  generatedForm.style.backgroundColor = formBgColorInput.value;
});

formBorderColorInput.addEventListener("input", () => {
  generatedForm.style.border = `2px solid ${formBorderColorInput.value}`;
  generatedForm.style.borderRadius = "10px";
  generatedForm.style.padding = "20px";
});

fieldTypeSelect.addEventListener("change", () => {
  const selectedType = fieldTypeSelect.value;
  if (selectedType === "radio" || selectedType === "select") {
    optionInputsDiv.style.display = "block";
  } else {
    optionInputsDiv.style.display = "none";
    fieldOptionsInput.value = "";
  }
});

// Função para ativar o modo de edição do label
function activateEditMode(labelElement, editButton) {
    const fieldContentDiv = labelElement.closest("div.mb-3");
    
    // Verifica se já existe um input de edição ativo para este label
    const existingEditInput = fieldContentDiv.querySelector("input.edit-label-input");
    if (existingEditInput) {
        existingEditInput.focus();
        return; // Sai da função para não criar múltiplos inputs
    }

    labelElement.style.display = "none";
    editButton.disabled = true; // Desabilita o botão de editar para evitar múltiplos cliques

    const editarLabel = document.createElement("input");
    editarLabel.type = "text";
    editarLabel.value = labelElement.textContent;
    editarLabel.className = "form-control edit-label-input"; // Adiciona uma classe para identificação

    fieldContentDiv.insertBefore(editarLabel, labelElement); // Insere o input antes do label original

    editarLabel.focus();

    const finalizeEdit = () => {
        labelElement.textContent = editarLabel.value;
        editarLabel.remove(); // Remove o input de edição
        labelElement.style.display = ""; // Volta a exibir o label original
        editButton.disabled = false; // Habilita o botão novamente
    };

    editarLabel.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita a quebra de linha em textareas ou envio de formulário
            event.stopPropagation(); // Impede que o evento se propague para outros elementos
            finalizeEdit();
        }
    });

    editarLabel.addEventListener("blur", () => {
        finalizeEdit(); // Finaliza a edição quando o input perde o foco
    });
}


addFieldBtn.addEventListener("click", () => {
  const labelText = fieldLabelInput.value.trim();
  const fieldType = fieldTypeSelect.value;
  const optionsText = fieldOptionsInput.value.trim();

  if (!labelText) {
    alert("Digite um nome para o campo.");
    return;
  }
  const fieldWrapper = document.createElement("div");
  fieldWrapper.className = "mb-3 position-relative";
  
  // Div para agrupar os botões de ação e dar espaçamento
  const fieldActionsDiv = document.createElement("div");
  fieldActionsDiv.className = "field-actions";

  const botaoDeEditarLabel = document.createElement("button");
  botaoDeEditarLabel.className = "btn btn-sm btn-outline-primary";
  botaoDeEditarLabel.type = "button";
  botaoDeEditarLabel.innerHTML = '<i class="bi bi-pencil"></i> Edit'; 
  
  const botaoDeDeletar = document.createElement("button");
  botaoDeDeletar.className = "btn btn-sm btn-outline-danger";
  botaoDeDeletar.type = "button";
  botaoDeDeletar.innerHTML = '<i class="bi bi-x-circle"></i> Delete'; 

  // Adiciona os botões à div de ações
  fieldActionsDiv.appendChild(botaoDeEditarLabel);
  fieldActionsDiv.appendChild(botaoDeDeletar);
  
  // Adiciona a div de ações ao wrapper do campo
  fieldWrapper.appendChild(fieldActionsDiv);

  botaoDeDeletar.addEventListener("click", (event)=>{
    event.preventDefault();
    event.stopPropagation();
    event.target.closest("div.mb-3").remove(); // Busca a div do campo inteiro
  });

  botaoDeEditarLabel.addEventListener("click", (event)=>{
    event.preventDefault();
    event.stopPropagation();

    const closestLabel = fieldWrapper.querySelector("label");
    // Verifica se é um campo que tem um label direto para editar
    // Campos de rádio/select tem um label para cada opção, não um label "geral" editável dessa forma
    if (closestLabel && (fieldType === "text" || fieldType === "email" || fieldType === "date")) {
        activateEditMode(closestLabel, botaoDeEditarLabel);
    } else {
        alert("A edição direta de label para este tipo de campo ainda não é suportada ou não se aplica.");
    }
  });
  
  const label = document.createElement("label");
  label.textContent = labelText;
  label.className = "form-label";

  fieldWrapper.appendChild(label);


  if (fieldType === "text" || fieldType === "email" || fieldType === "date") {
    const input = document.createElement("input");
    input.type = fieldType;
    input.className = "form-control";
    fieldWrapper.appendChild(input);

      input.addEventListener("keydown", (e)=>{
        if(e.key === "Enter"){
          e.preventDefault();
          e.stopPropagation();
        }
      });

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
      radioInput.name = labelText; // O name é o labelText para agrupar
      radioInput.className = "form-check-input";
      

      radioInput.addEventListener("keydown", (e)=>{
        if(e.key === "Enter"){
          e.preventDefault();
          e.stopPropagation();
        }
      });

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

  fieldLabelInput.value = "";
  fieldTypeSelect.value = "text";
  fieldOptionsInput.value = "";
  optionInputsDiv.style.display = "none";
});

// --- Abas do editor ---
const editorTabs = document.getElementById('editorTabs');
const tabButtons = editorTabs.querySelectorAll('.nav-link');
const tabContents = document.getElementById('editorTabContent').querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' e 'show' de todos os conteúdos e botões
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('show', 'active'));

        // Adiciona 'active' e 'show' ao botão e conteúdo clicados
        button.classList.add('active');
        const targetTabId = button.dataset.bsTarget;
        document.querySelector(targetTabId).classList.add('show', 'active');
    });
});

// --- Editor de header ---
headerTitleInput.addEventListener("input", () => {
    headerTitleActual.textContent = headerTitleInput.value;
});

headerBgColorInput.addEventListener("input", () => {
    mainHeader.style.backgroundColor = headerBgColorInput.value;
});

headerTextColorInput.addEventListener("input", () => {
    mainHeader.style.color = headerTextColorInput.value;
    headerTitleActual.style.color = headerTextColorInput.value; // Garante a cor no H1
});

headerFontSizeInput.addEventListener("input", () => {
    headerTitleActual.style.fontSize = `${headerFontSizeInput.value}px`;
});


headerImageInput.addEventListener("input", () => {
    if (headerImageInput.value.trim()) {
        headerImageActualMain.src = headerImageInput.value.trim();
        headerImageActualMain.style.display = "block";
    } else {
        headerImageActualMain.src = "";
        headerImageActualMain.style.display = "none";
    }
});


// --- Editor de menu ---
menuBgColorInput.addEventListener("input", () => {
    menuPreview.style.backgroundColor = menuBgColorInput.value;
});

menuItemTextColorInput.addEventListener("input", () => {
    menuList.querySelectorAll('a').forEach(item => {
        item.style.color = menuItemTextColorInput.value;
    });
});

addMenuItemBtn.addEventListener("click", () => {
    const itemText = menuItemTextInput.value.trim();
    const itemUrl = menuItemUrlInput.value.trim();

    if (!itemText) {
        alert("Digite o texto para o item do menu.");
        return;
    }

    // Adiciona ao editor
    const editorItemDiv = document.createElement("div");
    editorItemDiv.className = "menu-item";
    editorItemDiv.innerHTML = `
        <span>${itemText} (${itemUrl})</span>
        <div>
            <button class="btn btn-sm btn-outline-danger delete-menu-item-editor">Excluir</button>
        </div>
    `;
    menuItemsContainer.appendChild(editorItemDiv);

    editorItemDiv.querySelector('.delete-menu-item-editor').addEventListener('click', () => {
        editorItemDiv.remove();
        updateMenuPreview();
    });

    // Limpa os campos
    menuItemTextInput.value = "";
    menuItemUrlInput.value = "#";

    updateMenuPreview();
});

function updateMenuPreview() {
    menuList.innerHTML = ''; // Limpa a pré-visualização
    menuItemsContainer.querySelectorAll('.menu-item').forEach(editorItem => {
        const textSpan = editorItem.querySelector('span');
        if (textSpan) {
            const itemText = textSpan.textContent.split('(')[0].trim();
            const itemUrlMatch = textSpan.textContent.match(/\((.*?)\)/);
            const itemUrl = itemUrlMatch ? itemUrlMatch[1] : '#';

            const menuItem = document.createElement("li");
            menuItem.className = "nav-item";
            menuItem.innerHTML = `<a class="nav-link" href="${itemUrl}" style="color: ${menuItemTextColorInput.value};">${itemText}</a>`;
            menuList.appendChild(menuItem);
        }
    });
}


// --- Editor de galeria ---
galleryBgColorInput.addEventListener("input", () => {
    galleryPreview.style.backgroundColor = galleryBgColorInput.value;
});

addGalleryCardBtn.addEventListener("click", () => {
    const imageUrl = galleryImageUrlInput.value.trim();
    const cardTitle = galleryCardTitleInput.value.trim();
    const cardDescription = galleryCardDescriptionInput.value.trim();

    if (!imageUrl || !cardTitle) {
        alert("A URL da imagem e o título do card são obrigatórios.");
        return;
    }

    // Adiciona ao editor
    const editorCardDiv = document.createElement("div");
    editorCardDiv.className = "gallery-card-editor";
    editorCardDiv.innerHTML = `
        <img src="${imageUrl}" alt="Card Image" style="width: 50px; height: 50px; object-fit: cover;">
        <div class="card-info">
            <strong>${cardTitle}</strong><br>
            <small>${cardDescription.substring(0, 50)}...</small>
        </div>
        <div>
            <button class="btn btn-sm btn-outline-danger delete-gallery-card-editor">Excluir</button>
        </div>
    `;
    galleryCardsContainer.appendChild(editorCardDiv);

    editorCardDiv.querySelector('.delete-gallery-card-editor').addEventListener('click', () => {
        editorCardDiv.remove();
        updateGalleryPreview();
    });

    // Limpa os campos
    galleryImageUrlInput.value = "";
    galleryCardTitleInput.value = "";
    galleryCardDescriptionInput.value = "";

    updateGalleryPreview();
});

function updateGalleryPreview() {
    galleryCardsPreviewContainer.innerHTML = ''; // Limpa a pré-visualização
    galleryCardsContainer.querySelectorAll('.gallery-card-editor').forEach(editorCard => {
        const imageUrl = editorCard.querySelector('img').src;
        const cardTitle = editorCard.querySelector('strong').textContent;
        const cardDescription = editorCard.querySelector('small') ? editorCard.querySelector('small').textContent.replace('...', '') : '';

        const cardDiv = document.createElement("div");
        cardDiv.className = "gallery-card-preview";
        cardDiv.innerHTML = `
            <img src="${imageUrl}" alt="${cardTitle}">
            <div class="gallery-card-preview-body">
                <h5>${cardTitle}</h5>
                <p>${cardDescription}</p>
            </div>
        `;
        galleryCardsPreviewContainer.appendChild(cardDiv);
    });
}


// ---  Editor de footer ---
footerText.addEventListener("input", () => {
    footerTextActual.textContent = footerText.value;
});

footerBgColorInput.addEventListener("input", () => {
    mainFooter.style.backgroundColor = footerBgColorInput.value;
});

footerTextColorInput.addEventListener("input", () => {
    mainFooter.style.color = footerTextColorInput.value; // Aplica a cor ao rodapé principal
    footerTextActual.style.color = footerTextColorInput.value; // Garante a cor no P
});



// --- Lógica para Gerenciamento de HTML/LocalStorage ---

function generateFullHtml() {
    const pageTitle = "Minha Página Gerada"; // Pode ser um input para o usuário futuramente

    // Captura o HTML atual das seções que estão na página (mainHeader e mainFooter)
    // E as seções de preview (menu, galeria, formulário)
    const headerHtml = mainHeader.outerHTML;
    const menuHtml = document.getElementById("menuPreview").outerHTML;
    const galleryHtml = document.getElementById("galleryPreview").outerHTML;
    const formHtml = document.getElementById("generatedForm").outerHTML;
    const footerHtml = mainFooter.outerHTML;

    // Concatena tudo
    const fullHtml = `<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${pageTitle}</title>
<link rel="stylesheet" href="styles.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
<style>
    /* Estilos embutidos para garantir a aparência no HTML gerado */
    body {
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: #f4f6f9;
        margin: 0;
        /* Padding inferior para acomodar o rodapé se ele for fixed */
        /* padding-bottom: 60px; */ 
    }
    .preview-section {
        margin-bottom: 20px;
        padding: 15px;
        border: 1px solid #eee;
        border-radius: 8px;
    }
    header { /* Estilos para o cabeçalho principal */
        padding: 20px;
        background-color: ${headerBgColorInput.value};
        color: ${headerTextColorInput.value};
    }
    #headerContent {
        display: flex;
        align-items: center; /* Alinha itens verticalmente */
        justify-content: center; /* Alinhamento padrão: centralizado */
        gap: 10px; /* Espaçamento entre a imagem e o título */
        width: fit-content; /* Faz a div se ajustar ao conteúdo */
        margin: 0 auto; /* Centraliza a div no header */
    }
    header img {
        display: ${headerImageInput.value.trim() ? 'block' : 'none'};
        max-width: 150px;
        max-height: 100px;
        object-fit: contain;
    }
    header h1 {
        font-size: ${headerFontSizeInput.value}px;
        margin-bottom: 0; /* Removido margin-bottom para não afetar o alinhamento flex */
        color: ${headerTextColorInput.value};
    }
    #menuPreview {
        padding: 10px 0;
        background-color: ${menuBgColorInput.value};
    }
    #menuList {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: center;
        gap: 15px;
    }
    #menuList .nav-item a {
        text-decoration: none;
        padding: 8px 15px;
        border-radius: 5px;
        transition: background-color 0.3s ease;
        color: ${menuItemTextColorInput.value}; /* Cor do texto do item de menu */
    }
    #menuList .nav-item a:hover {
        background-color: rgba(0,0,0,0.1);
    }
    #galleryPreview {
        padding: 20px;
        background-color: ${galleryBgColorInput.value};
    }
    #galleryCardsPreviewContainer {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        justify-content: center;
    }
    .gallery-card-preview {
        border: 1px solid #ddd;
        border-radius: 8px;
        overflow: hidden;
        width: 200px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        background-color: #fff;
    }
    .gallery-card-preview img {
        width: 100%;
        height: 150px;
        object-fit: cover;
    }
    .gallery-card-preview-body {
        padding: 10px;
    }
    .gallery-card-preview h5 {
        font-size: 1.1rem;
        margin-bottom: 5px;
        color: #333;
    }
    .gallery-card-preview p {
        font-size: 0.9rem;
        color: #666;
        margin-bottom: 0;
    }
    #generatedForm {
        background: ${formBgColorInput.value};
        border: 2px solid ${formBorderColorInput.value};
        border-radius: 10px;
        padding: 20px;
    }
    #formTitlePreview {
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        margin-bottom: 20px;
        color: #333;
    }
    .form-label {
        color: #333; /* Cor dos labels do formulário */
    }
    .form-control, .form-select {
        border: 1px solid #ccc; /* Borda dos campos do formulário */
        background-color: #fff; /* Fundo dos campos do formulário */
        color: #333; /* Cor do texto dos campos do formulário */
    }
    footer { /* Estilos para o rodapé principal */
        background: ${footerBgColorInput.value};
        text-align: center; /* Alinhamento padrão: centralizado */
        padding: 12px 0;
        font-size: 14px;
        color: ${footerTextColorInput.value};
    }
    /* Estilos para os botões de ação do formulário */
    .field-actions {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        gap: 5px; /* Espaçamento entre os botões */
    }
    .field-actions button {
        margin-top: -5px; /* Ajusta a posição para ficar mais alinhado ao label */
        margin-bottom: 5px;
    }
    /* Estilo para o input de edição de label */
    input.edit-label-input {
        border: 1px dashed #0d6efd;
    }
</style>
</head>
<body>
${headerHtml}
${menuHtml}
${galleryHtml}
${formHtml}
${footerHtml}
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
    return fullHtml;
}

showHtmlBtn.addEventListener("click", () => {
    generatedHtmlOutput.value = generateFullHtml();
});

saveHtmlBtn.addEventListener("click", () => {
    const htmlToSave = generateFullHtml();
    localStorage.setItem("savedPageHtml", htmlToSave);
    alert("HTML salvo no LocalStorage!");
});

loadHtmlBtn.addEventListener("click", () => {
    const savedHtml = localStorage.getItem("savedPageHtml");
    if (savedHtml) {
        generatedHtmlOutput.value = savedHtml;
        alert("HTML carregado do LocalStorage. Verifique a área 'Ver HTML Gerado'.");
        
    } else {
        alert("Nenhum HTML salvo no LocalStorage.");
    }
});

clearLocalStorageBtn.addEventListener("click", () => {
    localStorage.clear();
    alert("LocalStorage limpo!");
    generatedHtmlOutput.value = ""; // Limpa a área de exibição
});

// Inicialização das pré-visualizações com valores padrão se não houver dados
document.addEventListener('DOMContentLoaded', () => {
    // Inicialização do header
    headerTitleActual.textContent = headerTitleInput.value;
    mainHeader.style.backgroundColor = headerBgColorInput.value;
    mainHeader.style.color = headerTextColorInput.value;
    headerTitleActual.style.color = headerTextColorInput.value; // Garante a cor no H1
    headerTitleActual.style.fontSize = `${headerFontSizeInput.value}px`;
    
    // Alinhamento padrão centralizado para o conteúdo do header (flexbox)
    headerContent.style.justifyContent = 'center'; 

    // Imagem do cabeçalho
    if (headerImageInput.value.trim()) {
        headerImageActualMain.src = headerImageInput.value.trim();
        headerImageActualMain.style.display = "block";
    } else {
        headerImageActualMain.style.display = "none";
    }

    // Inicialização do menu (vazio)
    menuPreview.style.backgroundColor = menuBgColorInput.value;

    // Inicialização da galeria (vazia)
    galleryPreview.style.backgroundColor = galleryBgColorInput.value;


    // Inicialização do footer
    footerTextActual.textContent = footerText.value;
    mainFooter.style.backgroundColor = footerBgColorInput.value;
    mainFooter.style.color = footerTextColorInput.value; // Aplica a cor ao rodapé principal
    footerTextActual.style.color = footerTextColorInput.value; // Garante a cor no P
    mainFooter.style.textAlign = 'center'; // Alinhamento padrão centralizado para o rodapé
    footerTextActual.style.textAlign = 'center'; // Reforça alinhamento do texto no P
});