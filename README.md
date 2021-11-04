# Sistema Leads - Crack the Code

## Descrição 📃
O sistema tem como função realizar o cadastro e a manipulação dos status das leads do sistema ao se registrar localmente;

## Tecnologia Utilizada 📚
- **Linguagem**: Typescript;
- **Framework**: React.JS;
- **Pré-processadores de Css**: Sass;
- **Armazenamento**: Local-Storage;

## Principais Dependências 📚
- **Crypto**: Realiza a criptografia dos dados;
- **React-icons**: Pacote de ícones;
- **React-router-dom**: Usado para manipular as rotas;

## Instalação ℹ️
- Instale o **Yarn**;
- Realize a clonagem do sistema para a pasta desejada;
- Entre pelo terminal na pasta **"Frontend"**;
- Instale as dependências pelo código a seguir:
> yarn
- Utilize o código a seguir para iniciar o sistema:
> yarn dev

## Utilização 🏹
- Realize o cadastro na tela de login, sendo **obrigatório**;
- Caso esteja utilizando no mesmo dia do cadastro o token irá ser válido para a entrada, pulando esse passo;
- Caso não tenha nenhuma lead, clique no botão **"Novo Lead (+)"**;
- Cadastre a Lead com todos o campos, sendo **obrigatório**;
- Pode escolher um ou mais tipos de **"Oportunidades"**;
- O sistema irá retornar automaticamente caso não contenha um erro;
- Caso deseje ver as informações dentro e cada **Lead clique duas vezes**, abrindo assim uma **janela** com a informação;
- Caso deseje mudar o **Status** da Lead, arraste o container dela, aparecendo como destaque o campo fina;
- Caso mude de ideia no meio do caminho, recarregue a página;
- Caso tenha falhado o percurso, apenas passe o mouse em cima do componente final que irá ser concluído;

## Algumas Características 🤖
- O sistema contém um mecanismo de mensagem, que funciona com texto com outros componentes filhos, sendo um componente usado em todo sistema, se moldando de acordo com a necessidade;
- O token funciona por um dia, sendo que o mesmo e a senha ficam criptografados no Local-Storage;
- Caso seja deletado o arquivo **login** do Local-Storage, o sistema irá voltar para o início, sendo necessário realizar o registro novamente;
- O campo password, telefone e email tem regras próprias para sua conclusão, sendo necessário registrar adequadamente para funcionár;
- O campo telefone contém um template que é preenchido automaticamente;
- Os checkboxes das oportunidades pode ser escolhidos de forma total ou seu inverso, caso clique no primeiro em branco;

## Desenvolvedor 📝
- **Nome**: Marcelo Teixeira J;
- **Linkedln**: [link](https://www.linkedin.com/in/martex8/);

## Projeto Processo Seletivo EloGroup
