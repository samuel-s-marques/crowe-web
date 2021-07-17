<template>
	<div>
		<h2>Vue Formulate</h2>

		<FormulateForm v-model="formValues" @submit="handleSubmit">
			<FormulateInput name="nome" label="Nome" validation="required:trim" />
			<FormulateInput name="resumo_da_entrevista" label="Resumo da Entrevista" type="textarea" validation="required:trim" />
			<FormulateInput name="cep" label="CEP" vfe-mask="00000-000" validation="required:trim" @blur="handleCEP" id="cep" />

			<div class="triple">
				<FormulateInput
					name="logradouro"
					label="Logradouro"
					validation="required:trim"
					id="logradouro"
				/>

				<FormulateInput
					name="cidade"
					label="Cidade"
					validation="required:trim"
					id="cidade"
				/>

				<FormulateInput
					name="estado"
					label="Estado"
					validation="required:trim"
					id="estado"
				/>
			</div>

			<div class="triple">
				<FormulateInput name="numero" label="Número" validation="number|required:trim" />
				<FormulateInput name="complemento" label="Complemento" validation="required:trim" />
			</div>

			<FormulateInput type="submit" label="Enviar dados" />
		</FormulateForm>
	</div>
</template>

<script>
	export default {
		data: () => ({
			formValues: {}
		}),
		methods: {
			async handleSubmit() {
				await this.$axios.post(
					'http://127.0.0.1:3333/applicants/new', 
					this.formValues
				)
				.then((response) => {
					console.log(response.statusText)
				})
				.catch((error) => {
					console.log(error)
				})
			},
			handleCEP(event) {
				const cidade = document.getElementById('cidade')
				const estado = document.getElementById('estado')
				const logradouro = document.getElementById('logradouro')
				let cep = event.target.value

				if (cep != ''){
					const validaCEP = /^[-0-9]{9}$/

					if (validaCEP.test(cep)) {
						this.$axios.get(
							'https://viacep.com.br/ws/' + cep + '/json'
						)
						.then((response) => {
							console.log(response.data)
							cidade.value = response.data.localidade
							estado.value = response.data.uf
							logradouro.value = response.data.logradouro
						})
						.catch((error) => {
							console.log(error)
						})
					} else {
						alert('Formato de CEP inválido!')
					}
				}
			}
		}
	};
</script>

<style>
	@media (min-width: 650px) {
		.triple {
			display: flex;
		}

		.triple .formulate-input {
			margin-bottom: .25em;
			margin-right: 1em;
			flex-grow: 1;
		}

		.triple .formulate-input:last-child {
			margin-right: 0;
		}
	}

	@media (min-width: 720px) {
		.triple {
			display: block;
		}

		.triple .formulate-input {
			margin-bottom: 1.5em;
			margin-right: 0em;
		}
	}

	@media (min-width: 850px) {
		.triple {
			display: flex;
		}

		.triple .formulate-input {
			margin-bottom: .25em;
			margin-right: 1em;
		}

		.triple .formulate-input:last-child {
			margin-right: 0;
		}
	}
</style>