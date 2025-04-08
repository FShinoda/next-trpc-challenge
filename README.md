# Desafio tRPC com Next.js 15 + React.js

## Para rodar o projeto:

### 1. Instale as dependências
```bash
npm i
```
### 2. Rode o servidor

```bash
npm run dev
```

## Desafios
- Mexi apenas uma vez em um bootcamp com context e não era dentro do tRPC (até porque não havia trabalhado com ele até hoje) por isso também tive dificuldades e uma forma de poder realizar o gerenciamento de estado da aplicação (lista de tarefas) foi utilizado uma variável global dentro do context do tRPC;
- Outro desafio foi usar validação do zod. Em meu trabalho normalmente uso ele junto com um hook customizado para formulários do projeto, quando tive que aplicar aqui, não consegui. Precisaria de mais tempo para estudar a documentação e entender como aplicar. Apesar disso um plano de contingência foi usar `required` no campo de titulo. Mas entendo que o ideal seria retornar esse erro de validação pelo zod e então usar um AutoAnimated para renderizar o erro retornado abaixo do respectivo campo que não foi devidamente inputado;
- Para os estados de carregamento também tive dificuldade de entender como aplicar pois é outra coisa que percebi que o custom hook de onde trabalho faz de forma mais fácil porém encapsulada. Se tivesse mais tempo para investigar, diria que tem a ver com estados da aplicação (useState) e talvez algum outro hook;
- Sobre o infinite scroll acredito que conseguiria implementar caso conseguisse estudar mais um pouco. Lembro de já ter implementado algo parecido com um campo de busca de empregados usando useInfiniteQuery;

Apesar das frustrações dos desafios, foi bom perceber que algumas coisas preciso aprender a fazer "from scratch" sem dependender de como realizo no dia a dia de forma customizada e facilitada. Com certeza tenho muito a aprender e saio um pouco frustrada desse desafio pois queria conseguir concluí-lo por completo com mais cuidado e tempo também.
