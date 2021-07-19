<template>
	<div>
		<!-- navbar -->
		<navbar></navbar>
		<b-container>
			<h1>Formulário de cadastro</h1>

			<validation-observer ref="observer" v-slot="{ handleSubmit }">
				<b-form
					@submit.prevent="handleSubmit(onSubmit)"
					@reset="onReset"
				>
					<b-row>
						<b-col cols="7">
							<!-- provedor de validação
								regras: necessário escrever;
								mínimo de três (3) caracteres;
								apenas espaços e letras
							-->
							<validation-provider
								name="Nome"
								rules="required|min:3|alpha_spaces"
								v-slot="validationContext"
							>
								<!-- label do nome -->
								<b-form-group
									id="input-group-1"
									label="Nome:"
									label-for="nome"
									class="mb-2"
								>
									<!-- entrada do nome -->
									<b-form-input
										id="nome"
										v-model="form.nome"
										type="text"
										:state="getValidationState(validationContext)"
										aria-describedby="nome-live-feedback"
										class="mt-1"
									></b-form-input>

									<!-- feedback ao vivo do nome -->
									<b-form-invalid-feedback id="nome-live-feedback">
										{{ validationContext.errors[0] }}
									</b-form-invalid-feedback>
								</b-form-group>
							</validation-provider>
						</b-col>
						<b-col>
							<!-- provedor de validação
								regras: necessário escrever
							-->
							<validation-provider
								name="CPF"
								rules="required"
								v-slot="validationContext"
							>
								<!-- label do cpf -->
								<b-form-group
									id="input-group-2"
									label="CPF:"
									label-for="cpf"
									class="mb-2"
								>
									<!-- entrada do cpf -->
									<b-form-input
										id="cpf"
										v-model="form.cpf"
										type="text"
										:state="getValidationState(validationContext)"
										aria-describedby="cpf-live-feedback"
										class="mt-1"
										v-mask="'###.###.###-##'"
									></b-form-input>

									<!-- feedback ao vivo do cpf -->
									<b-form-invalid-feedback id="cpf-live-feedback">
										{{ validationContext.errors[0] }}
									</b-form-invalid-feedback>
								</b-form-group>
							</validation-provider>
						</b-col>
						<b-col>
							<!-- label do celular -->
							<b-form-group
								id="input-group-3"
								label="Telefone/Celular:"
								label-for="telefone"
								class="mb-2"
							>
								<!-- entrada do telefone -->
								<b-form-input
									id="telefone"
									v-model="form.telefone"
									type="text"
									v-mask="['(##) ####-####', '(##) #####-####']"
									class="mt-1"
								></b-form-input>
							</b-form-group>
						</b-col>
					</b-row>

					<!-- provedor de validação
						regras: é necessario;
						tem de ser um email
					-->
					<validation-provider
						name="E-mail"
						rules="required|email"
						v-slot="validationContext"
					>
						<!-- label do email -->
						<b-form-group
							id="input-group-4"
							label="E-mail:"
							label-for="email"
							class="mb-2"
						>
							<!-- entrada do email -->
							<b-form-input
								id="email"
								v-model="form.email"
								type="email"
								:state="getValidationState(validationContext)"
								aria-describedby="email-live-feedback"
								class="mt-1"
							></b-form-input>
							
							<!-- feedback ao vivo do email -->
							<b-form-invalid-feedback id="email-live-feedback">
								{{ validationContext.errors[0] }}
							</b-form-invalid-feedback>
						</b-form-group>
					</validation-provider>

					<!-- provedor de validação
						regras: é necessario;
					-->
					<validation-provider
						name="Resumo"
						rules="required"
						v-slot="validationContext"
					>
						<!-- label do resumo da entrevista -->
						<b-form-group
							id="input-group-5"
							label="Resumo da entrevista:"
							label-for="resumo_da_entrevista"
							class="mb-2"
						>
							<!-- entrada do resumo da entrevista -->
							<b-form-textarea
								id="resumo_da_entrevista"
								v-model="form.resumo_da_entrevista"
								type="text"
								class="mt-1"
								rows="3"
								max-rows="12"
								:state="getValidationState(validationContext)"
								aria-describedby="resumo-live-feedback"
							></b-form-textarea>

							<!-- feedback ao vivo do resumo da entrevista -->
							<b-form-invalid-feedback id="resumo-live-feedback">
								{{ validationContext.errors[0] }}
							</b-form-invalid-feedback>
						</b-form-group>
					</validation-provider>

					<b-row>
						<b-col>

							<!-- provedor de validação
								regras: é necessario
							-->
							<validation-provider
								name="CEP"
								rules="required"
								v-slot="validationContext"
							>
								<!-- label do cep -->
								<b-form-group
									id="input-group-6"
									label="CEP:"
									label-for="cep"
									class="mb-2"
								>
									<!-- entrada do cep -->
									<b-form-input
										id="cep"
										v-model="form.cep"
										type="text"
										class="mt-1"
										v-mask="'#####-###'"
										@blur.native="handleCEP"
										:state="getValidationState(validationContext)"
										aria-describedby="cep-live-feedback"
									></b-form-input>

									<!-- feedback ao vivo do cep -->
									<b-form-invalid-feedback id="cep-live-feedback">
										{{ validationContext.errors[0] }}
									</b-form-invalid-feedback>
								</b-form-group>
							</validation-provider>
						</b-col>
						<b-col cols="10">

							<!-- provedor de validação
								regras: é necessario;
							-->
							<validation-provider
								name="Logradouro"
								rules="required"
								v-slot="validationContext"
							>
								<!-- label do cep -->
								<b-form-group
									id="input-group-7"
									label="Logradouro:"
									label-for="logradouro1"
									class="mb-2"
								>
									<!-- entrada do logradouro -->
									<b-form-input
										id="logradouro1"
										v-model="form.logradouro"
										type="text"
										:state="getValidationState(validationContext)"
										aria-describedby="logradouro-live-feedback"
										class="mt-1"
									></b-form-input>

									<!-- feedback ao vivo do logradouro -->
									<b-form-invalid-feedback id="logradouro-live-feedback">
										{{ validationContext.errors[0] }}
									</b-form-invalid-feedback>
								</b-form-group>
							</validation-provider>
						</b-col>
					</b-row>

					<b-row>
						<b-col>

							<!-- provedor de validação
								regras: é necessario;
								apenas espaço e letras
							-->
							<validation-provider
								name="Cidade"
								rules="required|alpha_spaces"
								v-slot="validationContext"

							>
								<!-- label da cidade -->
								<b-form-group
									id="input-group-8"
									label="Cidade:"
									label-for="cidade"
									class="mb-2"
								>
									<!-- entrada da cidade -->
									<b-form-input
										id="cidade"
										v-model="form.cidade"
										type="text"
										:state="getValidationState(validationContext)"
										aria-describedby="cidade-live-feedback"
										class="mt-1"
									></b-form-input>

									<!-- feedback ao vivo da cidade -->
									<b-form-invalid-feedback id="cidade-live-feedback">
										{{ validationContext.errors[0] }}
									</b-form-invalid-feedback>
								</b-form-group>
							</validation-provider>
						</b-col>
						<b-col>

							<!-- provedor de validação
								regras: é necessario;
								maximo: 2
							-->
							<validation-provider
								name="Estado"
								rules="required|max:2"
								v-slot="validationContext"
							>
								<!-- label do estado  -->
								<b-form-group
									id="input-group-9"
									label="Estado:"
									label-for="estado"
									class="mb-2"
								>
									<!-- label do estado -->
									<b-form-input
										id="estado"
										v-model="form.estado"
										type="text"
										:state="getValidationState(validationContext)"
										aria-describedby="estado-live-feedback"
										v-mask="'AA'"
										class="mt-1"
									></b-form-input>

									<!-- feedback ao vivo do estado -->
									<b-form-invalid-feedback id="estado-live-feedback">
										{{ validationContext.errors[0] }}
									</b-form-invalid-feedback>
								</b-form-group>
							</validation-provider>
						</b-col>
						<b-col>

							<!-- provedor de validação
								regras: é necessario;
							-->
							<validation-provider
								name="Número"
								rules="required"
								v-slot="validationContext"
							>
								<!-- label do número -->
								<b-form-group
									id="input-group-10"
									label="Número:"
									label-for="numero"
									class="mb-2"
								>
									<!-- entrada do número -->
									<b-form-input
										id="numero"
										v-model="form.numero"
										type="text"
										:state="getValidationState(validationContext)"
										aria-describedby="numero-live-feedback"
										v-mask="'##############'"
										class="mt-1"
									></b-form-input>

									<!-- feedback ao vivo do número -->
									<b-form-invalid-feedback id="numero-live-feedback">
										{{ validationContext.errors[0] }}
									</b-form-invalid-feedback>
								</b-form-group>
							</validation-provider>
						</b-col>
						<b-col>

							<!-- provedor de validação
								regras: é necessario;
							-->
							<validation-provider
								name="Complemento"
								rules="required"
								v-slot="validationContext"
							>
								<!-- label do complemento -->
								<b-form-group
									id="input-group-11"
									label="Complemento:"
									label-for="complemento"
									class="mb-2"
								>
									<!-- entrada do complemento -->
									<b-form-input
										id="complemento"
										v-model="form.complemento"
										type="text"
										:state="getValidationState(validationContext)"
										aria-describedby="complemento-live-feedback"
										class="mt-1"
									></b-form-input>

									<!-- feedback ao vivo o complemento -->
									<b-form-invalid-feedback id="complemento-live-feedback">
										{{ validationContext.errors[0] }}
									</b-form-invalid-feedback>
								</b-form-group>
							</validation-provider>
						</b-col>
					</b-row>

					<!-- botão de enviar -->
					<b-button type="submit" id="submitButton" block variant="primary" class="mt-2">Enviar dados</b-button>
				</b-form>
			</validation-observer>
		</b-container>
	</div>
</template>

<script>
	import Vue from 'vue'

	// importa a Navbar e transforma-a em componente
	import Navbar from './Navbar.vue'

	Vue.component('navbar', Navbar)

	export default {
		data: () => ({
			form: {},
		}),
		methods: {
			// pega o estado de validação
			getValidationState({ dirty, validated, valid = null}) {
				return dirty || validated ? valid : null
			},
			// ao receber os dados
			async onSubmit () {
				// checar validez
				const isValid = await this.$refs.observer.validate()

				// se for inválido
				if (!isValid){
					// envia toast
					this.$bvToast.toast('Há algo errado com o formulário! Está faltando algo?', {
						title: 'Erro!',
						variant: 'success',
						appendToast: false
					})
				}

				// caso contrário, envia os dados
				await this.$axios.post(
					'/applicants/new', 
					this.form
				)
				.then(() => {
					// envia toast de sucesso ao receber resposta
					this.$bvToast.toast('Dados enviados!', {
						title: 'Sucesso!',
						variant: 'success',
						appendToast: false
					})
				})
				.catch((error) => {
					console.log(error)
					// se der erro, envia toast de erro
					this.$bvToast.toast('Não foi possível enviar os dados!', {
						title: 'Erro!',
						variant: 'danger',
						appendToast: false
					})
				})
			},
			onReset (event) {
				event.preventDefault()
				this.show = false
				this.$nextTick(() => {
					this.show = true
				})
			},
			// receber CEP
			handleCEP(event) {
				const cidade = document.getElementById('cidade')
				const estado = document.getElementById('estado')
				const logradouro = document.getElementById('logradouro1')
				let cep = event.target.value
				const validaCEP = /^[-0-9]{9}$/ // regex de CEP

				// se o regex identificar o CEP
				if (validaCEP.test(cep)) {
					// envia requisição à API do viacep
					this.$axios.get(
						'https://viacep.com.br/ws/' + cep + '/json'
					)
					.then((response) => {
						// se der erro
						if (response.data.erro) {
							// envia toast de erro
							this.$bvToast.toast('Escolha um CEP válido!', {
								title: 'Erro!',
								toaster: 'b-toaster-top-center',
								solid: true,
								variant: 'danger',
								appendToast: false,
							})
						} else {
							// caso contrário, atualiza as entradas
							cidade.value = response.data.localidade
							estado.value = response.data.uf
							logradouro.value = response.data.logradouro
						}
					})
					.catch(() => {
						// se der erro na requisição, envia pro console o erro e manda toast
						this.$bvToast.toast('Houve um erro na requisição! Verifique o console e chame o admin.', {
							title: 'Erro!',
							toaster: 'b-toaster-top-center',
							solid: true,
							variant: 'danger',
							appendToast: false,
						})
					})
				} else {
					this.$bvToast.toast('Escolha um CEP válido!', {
						title: 'Erro!',
						toaster: 'b-toaster-top-center',
						solid: true,
						variant: 'danger',
						appendToast: false,
					})
				}
			}
		}
	}
</script>

<style>
	#submitButton {
		margin-bottom: 10px;
	}
</style>