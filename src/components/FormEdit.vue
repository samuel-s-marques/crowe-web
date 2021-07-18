<template>
	<div>
		<navbar></navbar>
		<b-container class="w-50">
			<h1>Formulário de edição</h1>
			<b-form
				@submit="onSubmit"
				@reset="onReset"
				v-if="show"
			>
				<b-form-group
					id="input-group-1"
					label="Nome:"
					label-for="nome"
					class="mb-2"
				>
					<b-form-input
						id="nome"
						v-model="form.nome"
						type="text"
						required
						class="mt-1"
					></b-form-input>
				</b-form-group>

				<b-form-group
					id="input-group-2"
					label="Resumo da entrevista:"
					label-for="resumo_da_entrevista"
					class="mb-2"
				>
					<b-form-textarea
						id="resumo_da_entrevista"
						v-model="form.resumo_da_entrevista"
						type="text"
						required
						class="mt-1"
						rows="3"
						max-rows="8"
					></b-form-textarea>
				</b-form-group>

				<b-row>
					<b-col cols="2">
						<b-form-group
							id="input-group-3"
							label="CEP:"
							label-for="cep"
							class="mb-2"
						>
							<b-form-input
								id="cep"
								v-model="form.cep"
								type="text"
								required
								class="mt-1"
								v-mask="'#####-###'"
								@blur.native="handleCEP"
							></b-form-input>
						</b-form-group>
					</b-col>
					<b-col cols="10">
						<b-form-group
							id="input-group-4"
							label="Logradouro:"
							label-for="logradouro"
							class="mb-2"
						>
							<b-form-input
								id="logradouro"
								v-model="form.logradouro"
								type="text"
								required
								class="mt-1"
							></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>

				<b-row>
					<b-col>
						<b-form-group
							id="input-group-4"
							label="Cidade:"
							label-for="cidade"
							class="mb-2"
						>
							<b-form-input
								id="cidade"
								v-model="form.cidade"
								type="text"
								required
								class="mt-1"
							></b-form-input>
						</b-form-group>
					</b-col>
					<b-col>
						<b-form-group
							id="input-group-5"
							label="Estado:"
							label-for="estado"
							class="mb-2"
						>
							<b-form-input
								id="estado"
								v-model="form.estado"
								type="text"
								required
								v-mask="'AA'"
								class="mt-1"
							></b-form-input>
						</b-form-group>
					</b-col>
					<b-col>
						<b-form-group
							id="input-group-5"
							label="Número:"
							label-for="numero"
							class="mb-2"
						>
							<b-form-input
								id="numero"
								v-model="form.numero"
								type="text"
								required
								v-mask="'############'"
								class="mt-1"
							></b-form-input>
						</b-form-group>
					</b-col>
					<b-col>
						<b-form-group
							id="input-group-5"
							label="Complemento:"
							label-for="complemento"
							class="mb-2"
						>
							<b-form-input
								id="complemento"
								v-model="form.complemento"
								type="text"
								required
								max=2
								class="mt-1"
							></b-form-input>
						</b-form-group>
					</b-col>
				</b-row>

				<b-button type="submit" block variant="primary" class="mt-2">Enviar dados</b-button>
			</b-form>
		</b-container>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Navbar from './Navbar.vue'

	Vue.component('navbar', Navbar)

	export default {
		data: () => ({
			form: {},
			show: true
		}),
		methods: {
			async onSubmit (event) {
				event.preventDefault()

				await this.$axios.put(
					'/applicants/' + this.$route.params.id, 
					this.form
				)
				.then((response) => {
					if (response.statusText === 'OK') {
						this.$bvToast.toast('Dados atualizados!', {
							title: 'Sucesso!',
							variant: 'success',
							appendToast: false
						})
					} else {
						this.$bvToast.toast('Não foi possível atualizar os dados!', {
							title: 'Erro!',
							variant: 'danger',
							appendToast: false
						})
					}
				})
				.catch((error) => {
					console.log(error)
				})
			},
			onReset (event) {
				event.preventDefault()
				this.show = false
				this.$nextTick(() => {
					this.show = true
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

							if (response.data.erro) {
								this.$bvToast.toast('Escolha um CEP válido!', {
									title: 'Erro!',
									toaster: 'b-toaster-top-center',
									solid: true,
									variant: 'danger',
									appendToast: false,
								})
							} else {
								cidade.value = response.data.localidade
								estado.value = response.data.uf
								logradouro.value = response.data.logradouro
							}
						})
						.catch((error) => {
							console.log(error)
						})
					} else {
						alert('Formato de CEP inválido!')
					}
				}
			},

		},
		created() {
			this.$axios.get('/applicants/' + this.$route.params.id)
			.then((response) => {
				this.form = response.data
			})
			.catch((error) => {
				console.log(error)
			})
		}
	}
</script>