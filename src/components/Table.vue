<template>
	<div>
		<navbar></navbar>
		<b-container>
			<h1>Consulta de dados</h1>

			<b-row>
				<b-col lg="6" class="my-1">
					<b-form-group
						label="Filtrar"
						label-for="filter-input"
						label-cols-sm="3"
						label-align-sm="right"
						label-size="sm"
						class="mb-0"
					>
						<b-input-group size="sm">
							<b-form-input
								id="filter-input"
								v-model="filter"
								type="search"
								placeholder="Escreva para pesquisar"
							></b-form-input>

							<b-input-group-append>
								<b-button :disabled="!filter" @click="filter = ''">Limpar</b-button>
							</b-input-group-append>
						</b-input-group>
					</b-form-group>
				</b-col>

				<b-col lg="6" class="my-1">
					<b-form-group
						label="Filtrar sobre"
						description="Deixe tudo desmarcado para filtrar todos os dados"
						label-cols-sm="3"
						label-align-sm="right"
						label-size="sm"
						class="mb-0"
						v-slot="{ ariaDescribedby }"
					>
						<b-form-checkbox-group
							v-model="filterOn"
							:aria-describedby="ariaDescribedby"
							class="mt-1"
						>
							<b-form-checkbox value="nome">Nome</b-form-checkbox>
							<b-form-checkbox value="email">E-mail</b-form-checkbox>
							<b-form-checkbox value="created_at">Dia de cadastro</b-form-checkbox>
						</b-form-checkbox-group>
					</b-form-group>
				</b-col>
			</b-row>

			<!-- componente da tabela -->
			<b-table
				id="minha-tabela"
				ref="minha_tabela"
				:items="items"
				:fields="fields"
				:hover="true"
				:current-page="currentPage"
				:per-page="perPage"
				:filter="filter"
				:busy="isBusy"
				:filter-included-fields="filterOn"
				@filtered="onFiltered"
				responsive="md"
			>
				<template #table-busy>
					<div class="text-center text-danger my-2">
						<b-spinner class="align-middle"></b-spinner>
						<strong>Carregando...</strong>
					</div>
				</template>

				<template #row-details="row">
					<!-- card dos dados -->
					<b-card>
						<b-row class="mb-2">
							<b-col sm="3" class="text-sm"><b>Nome: </b></b-col>
							<b-col>{{ row.item.nome }}</b-col>
						</b-row>

						<b-row class="mb-2">
							<b-col sm="3" class="text-sm"><b>Telefone: </b></b-col>
							<b-col>{{ row.item.telefone }}</b-col>
						</b-row>

						<b-row class="mb-2">
							<b-col sm="3" class="text-sm"><b>CPF: </b></b-col>
							<b-col>{{ row.item.cpf }}</b-col>
						</b-row>

						<b-row class="mb-2">
							<b-col sm="3" class="text-sm"><b>E-mail: </b></b-col>
							<b-col>{{ row.item.email }}</b-col>
						</b-row>

						<b-row class="mb-2">
							<b-col sm="3" class="text-sm"><b>Resumo da entrevista: </b></b-col>
							<b-col>{{ row.item.resumo_da_entrevista }}</b-col>
						</b-row>

						<b-row class="mb-2">
							<b-col sm="3" class="text-sm"><b>Logradouro: </b></b-col>
							<b-col>{{ row.item.logradouro }}</b-col>
						</b-row>

						<b-row class="mb-2">
							<b-col sm="3" class="text-sm"><b>Número: </b></b-col>
							<b-col>{{ row.item.numero }}</b-col>
						</b-row>

						<b-row class="mb-2">
							<b-col sm="3" class="text-sm"><b>Complemento: </b></b-col>
							<b-col>{{ row.item.complemento }}</b-col>
						</b-row>

						<b-row class="mb-2">
							<b-col sm="3" class="text-sm"><b>Cidade: </b></b-col>
							<b-col>{{ row.item.cidade }}</b-col>
						</b-row>

						<b-row class="mb-2">
							<b-col sm="3" class="text-sm"><b>Estado: </b></b-col>
							<b-col>{{ row.item.estado }}</b-col>
						</b-row>

						<b-row class="mb-2">
							<b-col sm="3" class="text-sm"><b>CEP: </b></b-col>
							<b-col>{{ row.item.cep }}</b-col>
						</b-row>
					</b-card>
				</template>

				<template #cell(name)="row">
					{{ row.value }}
				</template>

				<!-- botões das ações -->
				<template #cell(actions)="row">
					<b-button
						id="table-button"
						size="sm"
						@click="info(row.item)"
						class="mr-1"
					>
						<b-icon-pencil-fill></b-icon-pencil-fill>
					</b-button>

					<b-button
						id="table-button"
						size="sm"
						@click="row.toggleDetails"
						class="mr-1"
					>
						<b-icon-eye-fill></b-icon-eye-fill>
					</b-button>

					<b-button
						id="table-button"
						size="sm"
						class="mr-1"
						@click="deletar(row.item)"
						variant="danger"
					>
						<b-icon-trash-fill></b-icon-trash-fill>
					</b-button>
				</template>
			</b-table>

			<!-- componente de paginação -->
			<b-pagination
				v-model="currentPage"
				aria-controls="minha-tabela"
				:per-page="perPage"
				:total-rows="rows"
			></b-pagination>
		</b-container>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Navbar from './Navbar.vue'
	import moment from 'moment'
	import axios from 'axios'

	moment.locale('pt')

	Vue.component('navbar', Navbar)

	export default {
		data() {
			// campos mostrados na tabela
			return {
				currentPage: 1,
				perPage: 10,
				items: this.myProvider,
				filter: null,
				isBusy: false,
				filterOn: [],
				fields: [
					{ key: 'id', stickyColumn: true, isRowHeader: true, label: 'ID', sortable: true },
					{ key: 'nome' },
					{ key: 'email', 'label': 'E-mail'},
					{ key: 'cidade' },
					{ key: 'estado' },
					{ key: 'cep', label: 'CEP' },
					{ 
						key: 'created_at',
						label: 'Dia de cadastro',
						// formatador que deixa legível a data
						formatter: (item) => {
							return moment(item.created_at).format('LL')
						},
						filterByFormatted: true,
						sortable: true
					},
					{ key: 'actions', label: 'Ações', stickyColumn: true},
				],
			}
		},
		methods: {
			// provedor de dados
			myProvider (ctx) {
				// verifica se está em modo de desenvolvimento
				if (process.env.NODE_ENV === 'development'){
					this.isBusy = true
					const params = '?page=' + ctx.currentPage
					axios.get('/applicants' + params)
					.then(response => {
						this.isBusy = false
						this.items = response.data.data
					})
					.catch(() => {
						this.isBusy = false
						this.items = []
					})
				// se não estiver
				} else {
					// envia requisições ao placeholder de json para pegar dados
					axios.get('https://my-json-server.typicode.com/samuel-s-marques/crowe-json-placeholder/db')
					.then(response => {
						this.items = response.data.data
					})
					.catch(() => {
						this.items = []
					})
				}

			},
			info (item) {
				// pega o id do item e redireciona o usuário à rota /editar/ + o id escolhido
				this.$router.push('/editar/' + item.id)
			},
			deletar (item) {
				// abre modal se o usuário apertar no botão de delete
				this.$bvModal.msgBoxConfirm(`Você deseja mesmo apagar o(a) candidato(a) ${item.nome}, do ID ${item.id}?`, {
					title: 'Por favor, confirme',
					okVariant: 'danger',
					okTitle: 'SIM',
					cancelTitle: 'NÃO',
					footerClass: 'p-2',
					hideHeaderClose: false,
					centered: true
				})
				.then(value => {
					// se a resposta do modal for SIM
					if (value === true) {
						// então é enviado requisição para deletar o candidato
						axios.delete('/applicants/' + item.id)
						.then(response => {
							if (response.statusText === 'OK') {
								// força refresh na tabela
								this.$refs.minha_tabela.refresh()
								this.$root.$emit('bv::refresh::table', 'minha-tabela')

								// emite um toast/notificação de sucesso
								this.$bvToast.toast('Candidato apagado!', {
									title: 'Sucesso!',
									variant: 'success',
									appendToast: false
								})
							} else {
								// emite um toast/notificação de erro
								this.$bvToast.toast('Não foi possível apagar o candidato!', {
									title: 'Erro!',
									variant: 'danger',
									appendToast: false
								})
							}
						})
						.catch ((erro) => {
							console.log(erro)
						})
					}
				})
				.catch(err => {
					console.log(err)
				})
			},
			onFiltered () {
				this.currentPage = 1
			}
		},
		computed: {
			rows() {
				if (process.env.NODE_ENV === 'production') return 20
				return this.items.length
			}
		}
	}
</script>

<style>
	@media screen and (max-width: 1200px) {
		#table-button:not(:first-child) {
			margin-top: 3px;
		}
	}
</style>