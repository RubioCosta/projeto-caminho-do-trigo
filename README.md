------------------------------------------------ Serviços --------------------------------------------------

Produtos
- Produto(idProduto, nomeProduto, valorProduto, qtdEstoque, pontosProduto)
- Receita(idReceita, nomeReceita)
- ReceitaIngrediente(idReceitaIngrediente, idReceita, idIngrediente, gramaturaUtilizada)
- IngredienteProduto(idIngrediente, nomeIngrediente, gramaturaIngrediente)

Vendas
- ItensPedido(idItem, idPedido, idProduto, qtdProduto, pontosProduto)
- Pedido(idPedido, cpfCliente, idCupomFiscal, valorTotal, formaPagamento, situaçãoPedido, tipoVenda)

Clientes
- Cliente(cpfCliente, nomeCliente, idEndereco, situaçãoCliente, pontosCliente, telefone)
- Endereco(idEndereco, uf, cidade, bairro, rua, número, complemento)

Compras
- SolicitacaoCompra(idSolicitacaoCompra, cnpjFornecedor, valorTotal, observação)
- ItensSolicitacao(idItemSolicitação, idSolicitacaoCompra, idIngrediente, gramaturaSolicitada)
- Fornecedor(cnpjFornecedor, emailFornecedor)
