document.addEventListener('DOMContentLoaded', () => {
    // Elementos da acessibilidade
    const botaoAcessibilidade = document.getElementById('botao-acessibilidade');
    const opcoesAcessibilidade = document.getElementById('opcoes-acessibilidade');
    const aumentarFonteBtn = document.getElementById('aumentar-fonte');
    const diminuirFonteBtn = document.getElementById('diminuir-fonte');
    const alternaContrasteBtn = document.getElementById('alterna-contraste');
    const body = document.body;

    // Estado inicial
    let fontSize = 1; // Tamanho base da fonte em rem
    let isHighContrast = false;

    // Carregar preferências salvas (se houver)
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        fontSize = parseFloat(savedFontSize);
        body.style.fontSize = `${fontSize}rem`;
    }
    const savedContrast = localStorage.getItem('highContrast');
    if (savedContrast === 'true') {
        isHighContrast = true;
        body.classList.add('alto-contraste');
        alternaContrasteBtn.setAttribute('aria-pressed', 'true');
        alternaContrasteBtn.setAttribute('aria-label', 'Desativar modo de alto contraste');
    }

    // Função para atualizar ARIA labels
    function updateFontAriaLabels() {
        const pixelSize = (fontSize * 16).toFixed(1); // Converte rem para px (base 16px)
        aumentarFonteBtn.setAttribute('aria-label', `Aumentar o tamanho da fonte (atual: ${pixelSize}px)`);
        diminuirFonteBtn.setAttribute('aria-label', `Diminuir o tamanho da fonte (atual: ${pixelSize}px)`);
    }
    updateFontAriaLabels(); // Inicializa labels

    // Toggle do menu de acessibilidade
    botaoAcessibilidade.addEventListener('click', () => {
        const isExpanded = botaoAcessibilidade.getAttribute('aria-expanded') === 'true';
        botaoAcessibilidade.setAttribute('aria-expanded', !isExpanded);
        botaoAcessibilidade.classList.toggle('rotacao-botao', isExpanded);
        opcoesAcessibilidade.style.display = isExpanded ? 'none' : 'flex';
    });

    // Aumentar tamanho da fonte
    aumentarFonteBtn.addEventListener('click', () => {
        fontSize = Math.min(1.5, fontSize + 0.1); // Limite máximo de 1.5rem (24px)
        body.style.fontSize = `${fontSize}rem`;
        localStorage.setItem('fontSize', fontSize);
        updateFontAriaLabels();
    });

    // Diminuir tamanho da fonte
    diminuirFonteBtn.addEventListener('click', () => {
        fontSize = Math.max(0.75, fontSize - 0.1); // Limite mínimo de 0.75rem (12px)
        body.style.fontSize = `${fontSize}rem`;
        localStorage.setItem('fontSize', fontSize);
        updateFontAriaLabels();
    });

    // Alternar modo de alto contraste
    alternaContrasteBtn.addEventListener('click', () => {
        isHighContrast = !isHighContrast;
        body.classList.toggle('alto-contraste', isHighContrast);
        localStorage.setItem('highContrast', isHighContrast);
        alternaContrasteBtn.setAttribute('aria-pressed', isHighContrast);
        alternaContrasteBtn.setAttribute('aria-label', 
            isHighContrast ? 'Desativar modo de alto contraste' : 'Ativar modo de alto contraste'
        );
    });

    // Inicializar ScrollReveal
    ScrollReveal().reveal('#inicio h1, #inicio p, #inicio .botao-inicio', {
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        duration: 1000
    });
    ScrollReveal().reveal('#tropicalia img, #tropicalia h2, #tropicalia p', {
        delay: 300,
        distance: '30px',
        origin: 'left',
        duration: 1000
    });
    ScrollReveal().reveal('#galeria img', {
        delay: 200,
        distance: '20px',
        origin: 'bottom',
        interval: 200
    });
    ScrollReveal().reveal('#contato .formulario', {
        delay: 200,
        distance: '50px',
        origin: 'bottom',
        duration: 1000
    });
});
