<template>
	<div>
		<navbar></navbar>
		<b-container>
			<b-table
				id="minha-tabela"
				:items="myProvider"
				:fields="fields"
				:hover="true"
			>
				<template #row-details="row">
					<b-card>
						<b-row class="mb-2">
							<b-col sm="3" class="text-sm"><b>Nome: </b></b-col>
							<b-col>{{ row.item.nome }}</b-col>
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

				<template #cell(actions)="row">
					<b-button
						size="sm"
						@click="info(row.item)"
						class="mr-1"
					>
						<b-icon-pencil-fill></b-icon-pencil-fill>
					</b-button>

					<b-button
						size="sm"
						@click="row.toggleDetails"
						class="mr-1"
					>
						<b-icon-eye-fill></b-icon-eye-fill>
					</b-button>

					<b-button
						size="sm"
						class="mr-1"
						@click="deletar(row.item)"
					>
						<b-icon-trash-fill variant="danger"></b-icon-trash-fill>
					</b-button>
				</template>
			</b-table>
		</b-container>
	</div>
</template>

<script>
	import Vue from 'vue'
	import Navbar from './Navbar.vue'
	import moment from 'moment'

	moment.locale('pt')

	Vue.component('navbar', Navbar)

	export default {
		data() {
			return {
				fields: [
					{ key: 'id', stickyColumn: true, isRowHeader: true, label: 'ID' },
					{ key: 'nome' },
					{ key: 'logradouro' },
					{ key: 'cidade' },
					{ key: 'estado' },
					{ key: 'cep', label: 'CEP' },
					{ 
						key: 'created_at',
						label: 'Dia de cadastro',
						formatter: (item) => {
							return moment(item.created_at).format('LL')
						}
					},
					{ key: 'actions', label: 'Ações'},
				]
			}
		},
		methods: {
			myProvider (ctx, callback) {
				this.$axios.get('/applicants')
				.then(response => {
					const items = response.data
					callback(items)
				})
				.catch(() => {
					callback([])
				})
			},
			info (item) {
				this.$router.push('/editar/' + item.id)
			},
			deletar (item) {
				this.$axios.delete('/applicants/' + item.id)
				.then(response => {
					if (response.statusText === 'OK') {
						// força refresh na tabela
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
		}
	}
</script>