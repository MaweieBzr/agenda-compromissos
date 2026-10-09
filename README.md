# Agenda Clara — Agenda de Compromissos

Aplicação web para organizar compromissos pessoais. O projeto vem com os requisitos do cenario C do trabalho de Front End e Frameworks, foi desenvolvido individualmente com HTML, CSS e JavaScript.

## Integrante

- **Nome completo:** Gabriel Bezerra de Oliveira Felix
- **GitHub:** MaweieBzr

## Problema, usuários e necessidades

É fácil esquecer horários e detalhes de compromissos quando eles ficam espalhados entre anotações e mensagens. Esta agenda foi pensada para ficar em check com seus compromissos sem ter de acessar varios apps, sites ou bloco de notas para ver individualmente. Nesta pagina voce pode acessar todos os dados que voce por e manter-se em dia com seus compromissos.
As necessidades identificadas são registrar uma descrição, data e horário; consultar os compromissos em ordem cronológica; encontrar um item pela busca; ver rapidamente o que está marcado para hoje e qual é o próximo compromisso; e apagar itens que não ja nao sao mais necessarios.

## Funcionalidades

- Cadastro de compromisso com descrição, data, horário e observação opcional.
- Listagem ordenada por data e horário.

- Remoção de compromissos.

- Busca por descrição e observação.

- Filtros para todos os compromissos, hoje e próximos.

- Resumo da quantidade total, itens de hoje e próximo compromisso.(A parte que indica 0 item e compromisos)

- Localiza-se no `localStorage` do navegador, sem conta ou servidor.(O que for prenchido dentro do site ficara no local storage do seu computador, se for tentar acessar por outro dispositivo nao havera nada, ja que nao ha servidor e nem login ou algo do tipo para ficar salvo)

- Interface adaptada para funcionar em computador e celular.

- Alternância entre modo claro e noturno, com preferência salva no navegador.( Adicionei isto so por capricho meu pois nao gosto normalmente de paginas com tema claro.)

## Tecnologias utilizadas

- **HTML** para a estrutura semântica, formulário, campos, botões e regiões de conteúdo.
- **CSS** para cores, espaçamento, hierarquia visual e adaptação a telas menores.
- **JavaScript** para representar compromissos como objetos em um array, responder a eventos, atualizar o DOM e salvar os dados e a preferência de tema localmente.

## Estrutura do projeto

```text
agenda-compromissos/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── README.md
```

## Como executar

1. Baixe ou clone o repositório.
2. Abra `index.html` em um navegador atualizalizado a sua preferencia.
3. Cadastre um compromisso pelo formulário. Os dados ficam no armazenamento local daquele navegador e dispositivo.

## Decisões de desenvolvimento

O projeto usa JavaScript sem biblioteca para manter a implementação alinhada ao conteúdo das primeiras unidades. Cada compromisso é um objeto com identificador, descrição, data, horário e observação; todos ficam em um array. Funções organizam a leitura do armazenamento, ordenação, atualização dos indicadores e renderização dos itens. Eventos de envio, busca, filtro e remoção atualizam a interface.

A aplicação não exige login, back-end ou API porque o objetivo é demonstrar fundamentos de front-end. O armazenamento local permite que a lista continue disponível no mesmo navegador, sem transmitir os compromissos a um serviço externo. A interface foi dividida visualmente em resumo, lista e formulário para facilitar a leitura.

## Comparação tecnológica

### Por que HTML, CSS e JavaScript foram suficientes?

O escopo é pequeno e funciona em uma única página. HTML oferece os elementos necessários para o formulário e a lista; CSS organiza a apresentação e a adaptação a telas; JavaScript controla eventos, dados, filtros e armazenamento local.

### O que poderia mudar com React?

1. Os blocos da tela poderiam virar componentes reutilizáveis, como formulário, cartão de resumo e linha de compromisso.
2. O estado da lista seria controlado pelo React e a interface seria atualizada a partir desse estado, reduzindo a manipulação manual do DOM.
3. Com mais telas e interações, ferramentas do ecossistema React poderiam ajudar a organizar navegação, validação e testes.

React também acrescentaria configuração, dependências e conceitos que não são necessários para este protótipo pequeno. A escolha faria mais sentido se o produto crescesse, tivesse várias telas, estado compartilhado ou componentes reutilizados.

### React seria necessariamente a melhor escolha?

Não. Para esta aplicação, HTML, CSS e JavaScript resolvem o problema com menos configuração e deixam explícitos o que foi requerido. React pode facilitar manutenção e organização conforme a complexidade aumenta, mas seria uma camada extra para um fluxo curto de cadastro, consulta e remoção. E como nao e um projeto que se va dar continuidade, alem de ser simples nao há necessidade do react no momento.

### E Vue ou Angular?

Vue seria uma alternativa válida para a evolução do projeto: oferece componentes e reatividade com uma estrutura que pode ser adotada gradualmente. Angular também permitiria construir a aplicação com componentes e ferramentas integradas, mas sua estrutura mais abrangente seria excessiva para o escopo atual. A decisão depende do tamanho, da manutenção esperada e das necessidades da equipe, não de uma tecnologia universalmente superior.

## Dificuldades e soluções

Uma decisão importante foi ordenar corretamente compromissos e comparar datas locais sem depender de formatos de data do navegador. A aplicação monta a chave local `AAAA-MM-DD` e ordena os itens por data e horário. Outra necessidade foi manter o resumo coerente com a lista depois de cadastro, busca, filtro e remoção; por isso a renderização recalcula os indicadores a partir do array atual. Como o projeto usa `localStorage`, os dados são locais ao navegador e não sincronizam entre dispositivos. Como era pra ser algo simples deixei de lado tal questao de salvar entre dispositivos a pagina de agendas.

## Divisão do trabalho

Projeto realizado individualmente. Acabei ficando sem grupo por descobrir de ultima hora sobre o trabalho entao resolvi fazer solo. (E tambem acho muita cara de pau entrar em um grupo com coisa feita de ultima hora (´▽`ʃ♡ƪ) )

## Histórico do desenvolvimento

- Organização em doc para por me guiar do que sera feito primeiro.
- Estrutura da página, resumo e formulário.(HTML)
- Estilos da interface e adaptação para celular.(CSS)
- Cadastro, listagem, busca, filtros, remoção e persistência local.(JS)
- Documentação dos requisitos e das decisões tecnológicas. (README)

## Uso de IA

Foi utilizada uma ferramenta de IA como apoio. A pessoa responsável pelo projeto revisou e adaptou a sugestão antes de usá-la e deve garantir que compreende o código entregue.

| Data | Modelo utilizado | Prompt utilizado | Onde foi usado |

| 09/10/2026 | GPT-6 (Codex) | Ler o enunciado do trabalho para pode organizar todas as requisicoes necessarias para o trabalho. | Ajuda pra poder montar uma estrutura para o site e comecar a adicionar funcionalidades (Como e onde cada elemento ficaria, pra nao ficar desorganizado e baguncado).|Correcao de erros e bugs. |Ajuda para montar o README |

O uso foi mais para poder ser orientado e ter uma nocao de organizacao para poder da inicio nas funcionalidades da pagina.Para corrigir erros de digitacao e ma conducao no uso de codigos tambem foi usado a ia. Alem de ter sido usado na montagem do read me ja que eu sinceramente nao sei nem por onde eu comecaria para manter tudo organizado. (Nao sei se deu pra perceber, sou pessimo organizando 〒▽〒 ).
## Melhorias futuras

- Editar compromissos já cadastrados.
- Exportar ou importar a agenda.
- Adicionar categorias e lembretes.
- Sincronizar dados em vários dispositivos com um serviço de back-end.




