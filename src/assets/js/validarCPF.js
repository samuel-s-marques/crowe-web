function validarCPF(cpf) {
	// tira a formatação do cpf
	cpf = cpf.replace(/[^\d]+/g, '')

	// valida se tem tamanho 11 ou se é sequência de digitos repetidos
	if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false

	// string para array
	cpf = cpf.split('')

	const validator = cpf
		// pega os 2 ultimos digitos de validação
		.filter((digit, index, array) => index >= array.length - 2 && digit)
		// transforma digitos em numeros
		.map(el => +el)

	const toValidate = pop => cpf
		// pega o array de items para validar
		.filter((digit, index, array) => index < array.length - pop && digit)
		// transforma digitos em numeros
		.map(el => +el)

	const resto = (count, pop) => (toValidate(pop)
		// calcula soma dos digitos e multiplica por 10
		.reduce((soma, el, i) => soma + el * (count - i), 0) * 10)
		// pegar o resto por 11
		% 11
		// transformar de 10 para 0
		% 10
	
	return !(resto(10, 2) !== validator[0] || resto(11, 1) !== validator[1])
}

export default validarCPF