<template>
	<div id="navbar">
		<b-navbar toggleable="lg" variant="light">
			<b-navbar-brand href="/">
				<img src="../assets/logo-crowe-full.png" width="auto" height="28" class="d-inline-block align-top" alt="Crowe logo">
			</b-navbar-brand>

			<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

			<b-collapse id="nav-collapse" is-nav>
				<b-navbar-nav>
					<b-nav-item href="/cadastro">Cadastro</b-nav-item>
					<b-nav-item href="/">Dados</b-nav-item>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
	export default {

	}
</script>

<style>
	#navbar {
		margin-bottom: 60px;
	}
</style>