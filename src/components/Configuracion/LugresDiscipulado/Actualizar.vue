<template>
    <div class="contenedor_modal">
        <div class="cuerpo_modal">
            <div class="cabecera_modal">
                <b-button type="button" variant="outline-danger" @click="salir" size="sm">Cerrar</b-button>
            </div>
            <b-container fluid="">
                <form @submit.prevent="actualizar">
                    <b-row>
                        <b-col sm="6" class="mt-3">
                            <label for="">Región</label>
                            <select class="form-control form-control-sm" required v-model="region">
                                <option value="">Seleccion</option>
                                <option value="1">Región 1</option>
                                <option value="2">Región 2</option>
                                <option value="3">Región 3</option>
                                <option value="4">Región 4</option>
                                <option value="5">Región 5</option>
                            </select>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Grupo</label>
                            <select class="form-control form-control-sm" required v-model="grupo">
                                <option value="">Seleccion</option>
                                <option value="1">Grupo 1</option>
                                <option value="2">Grupo 2</option>
                                <option value="3">Grupo 3</option>
                                <option value="4">Grupo 4</option>
                                <option value="5">Grupo 5</option>
                                <option value="6">Grupo 6</option>
                                <option value="7">Grupo 7</option>
                                <option value="8">Grupo 8</option>
                                <option value="9">Grupo 9</option>
                                <option value="10">Grupo 10</option>
                                <option value="11">Grupo 11</option>
                                <option value="12">Grupo 12</option>
                                <option value="13">Grupo 13</option>
                                <option value="14">Grupo 14</option>
                            </select>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Discipulador</label>
                            <b-form-input type="text" v-model="discipulador" autocomplete="off" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="6" class="mt-3">
                            <label for="">Anfitrión</label>
                            <b-form-input type="text" v-model="anfitrion" autocomplete="off" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="4" class="mt-3">
                            <label for="">Teléfono</label>
                            <b-form-input type="text" v-model="telefono" autocomplete="off" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="8" class="mt-3">
                            <label for="">Direccion</label>
                            <b-form-input type="text" v-model="direccion" autocomplete="off" required size="sm"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-4">
                            <b-button type="submit" size="sm" variant="primary" block >Actualizar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    name: 'ActualizarLugaresDiscipulado',
    props: ['itemLugar'],
    data() {
        return {
            region: '',
            grupo: '',
            discipulador: '',
            anfitrion: '',
            telefono: '',
            direccion: ''
        }
    },
    methods: {
        salir(){
            this.$emit('salir')
        },
        async actualizar(){
            let data = {
                api: 'lugaresdiscipulado',
                id: this.itemLugar.id,
                modo: 'param',
                pull: true,
                formulario: {
                    region: this.region,
                    grupo: this.grupo,
                    discipulador: this.discipulador.toUpperCase(),
                    anfitrion: this.anfitrion.toUpperCase(),
                    telefono: this.telefono,
                    direccion: this.direccion.toUpperCase()
                }
            }

            await this.updateData(data)
            await this.salir()
        },
        set_datos(){
            this.region = this.itemLugar.region
            this.grupo = this.itemLugar.grupo
            this.discipulador = this.itemLugar.discipulador
            this.anfitrion = this.itemLugar.anfitrion
            this.telefono = this.itemLugar.telefono
            this.direccion = this.itemLugar.direccion
        },
        ...mapActions(['updateData'])
    },
    mounted() {
        //document.getElementById('campoestado').focus()
        this.set_datos()
    },
}
</script>

<style>

</style>