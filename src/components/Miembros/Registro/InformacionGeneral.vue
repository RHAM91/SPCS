<template>
    <div class="marco">
        <b-container fluid="">
            <form @submit.prevent="guardar" @keyup="save_storage">
                <b-row>
                    <b-col sm="3" class="mt-3">
                        <label for="">CUI / DPI</label>
                        <b-form-input type="text" id="cui" v-model="cui" required autocomplete="off" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="6" class="mt-3">
                        <label for="">Nombre completo</label>
                        <b-form-input type="text" v-model="nombre" required autocomplete="off" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="3" class="mt-3">
                        <label for="">Cargo</label>
                        <select class="form-control form-control-sm" v-model="cargo" required>
                            <option value="">Selecciona</option>
                            <option value="Pastor">Pastor</option>
                            <option value="Obrero">Obrero</option>
                        </select>
                    </b-col>

                    <b-col sm="12" class="mt-3">
                        <label for="">Nombre de la iglesia</label>
                        <b-form-input type="text" v-model="nombre_iglesia" required autocomplete="off" size="sm"></b-form-input>
                    </b-col>
                    
                    <b-col sm="6" class="mt-3">
                        <label for="">Área</label>
                        <select class="form-control form-control-sm" v-model="area" required>
                            <option value="">Selecciona</option>
                            <option value="departamental">Departamental</option>
                            <option value="metropolitana">Metropolitana</option>
                            <option value="internacional">Internacional</option>
                        </select>
                    </b-col>
                    <b-col sm="6" class="mt-3">
                        <label for="">Region</label>
                        <b-form-input type="text" v-model="region" required autocomplete="off" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="4" class="mt-3">
                        <label for="">Teléfono</label>
                        <b-form-input type="text" v-model="telefono" placeholder="Opcional" autocomplete="off" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="4" class="mt-3">
                        <label for="">Correo</label>
                        <b-form-input type="text" v-model="correo" placeholder="Opcional" autocomplete="off" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="4" class="mt-3">
                        <label for="">País</label>
                        <b-form-input type="text" v-model="pais" placeholder="Opcional" autocomplete="off" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                        <b-button type="submit" size="sm" variant="success">Guardar</b-button>
                    </b-col>

                </b-row>
            </form>
        </b-container>

    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'


export default {
    name: 'InformacionGeneral',
    computed:{
        ...mapState(['profesiones', 'estadocivil', 'datos_personales'])
    },
    data() {
        return {
            mostrarCampoFechaFallecimiento: false,
            cui: '',
            nombre: '',
            cargo: '',
            nombre_iglesia: '',
            telefono: '',
            correo: '',
            pais: '',
            area: '',
            region: ''
            
        }
    },
    methods: {
        MostrarFechaFallecimiento(){
            if (this.status == 'Fallecido') {
                this.mostrarCampoFechaFallecimiento = true
            }else{
                this.mostrarCampoFechaFallecimiento = false
            }
        },
        async guardar(){
            let f = {
                api: 'pastores',
                pull: false,
                formulario: {
                    dpi: this.cui,
                    nombre: this.nombre.toUpperCase(),
                    cargo: this.cargo.toUpperCase(),
                    nombre_iglesia: this.nombre_iglesia.toUpperCase(),
                    telefono: this.telefono,
                    correo: this.correo,
                    pais: this.pais.toUpperCase(),
                    area: this.area,
                    region: this.region.toUpperCase()
                }
            }

            await this.saveData(f)
            //await this.pullData({api: 'entrevistas'})

                this.cui = ''
                this.nombre = ''
                this.cargo = ''
                this.nombre_iglesia = ''
                this.telefono = ''
                this.correo = ''
                this.pais = ''
                this.area = ''
                this.region = ''
                

                this.set_datos_personales('')
                //this.$emit('comprobacion', 'modulo_1')

            
        },
        save_storage(){

            let info = {
                cui: this.cui,
                nombre: this.nombre,
                cargo: this.cargo,
                nombre_iglesia: this.nombre_iglesia,
                telefono: this.telefono,
                correo: this.correo,
                pais: this.pais,
                area: this.area,
                region: this.region
            }

            let cadena = JSON.stringify(info)
            this.set_datos_personales(cadena)

        },
        restore_data(){
            if (this.datos_personales != '') {               
                let r = JSON.parse(this.datos_personales)
                
                this.cui = r.cui
                this.nombre = r.nombre
                this.cargo = r.cargo
                this.nombre_iglesia = r.nombre_iglesia
                this.telefono = r.telefono
                this.correo = r.correo
                this.pais = r.pais
                this.area = r.area
                this.region = r.region
            }


        },
        desactivacion(){
            this.$emit('desactivar')
        },
        ...mapActions(['saveData', 'pullData']),
        ...mapMutations(['set_datos_personales'])
    },
    mounted() {
        document.getElementById('cui').focus()
        this.restore_data()
    }
}
</script>

<style>

</style>