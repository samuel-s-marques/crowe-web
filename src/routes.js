import Form from './components/Form.vue'
import FormEdit from './components/FormEdit.vue'
import Table from './components/Table.vue'

export default [
	{
		path: '/',
		component: Table
	},
	{
		path: '/cadastro',
		component: Form
	},
	{
		path: '/editar/:id',
		component: FormEdit
	}
]