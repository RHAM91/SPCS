<template>
    <div class="marco">
        <b-container fluid="">
            <form @submit.prevent="guardar" @keyup="save_storage">
                <b-row>
                    <b-col sm="3" class="mt-3">
                        <label for="">CUI / DPI</label>
                        <b-form-input type="text" id="cui" v-model="cui" required autocomplete="off" size="sm"></b-form-input>
                    </b-col>

                    <b-col sm="3" class="mt-3">
                        <label for="">Nombres</label>
                        <b-form-input type="text" v-model="nombre" id="nombre_form" required autocomplete="off" size="sm"></b-form-input>
                    </b-col>
                    <b-col sm="3" class="mt-3">
                        <label for="">Apellidos</label>
                        <b-form-input type="text" v-model="apellidos" id="apellidos_form" required autocomplete="off" size="sm"></b-form-input>
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
                        <b-form-input type="text" v-model="nombre_iglesia" id="nombre_iglesia_form" required autocomplete="off" size="sm"></b-form-input>
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
                        <b-form-input type="text" v-model="pais" id="pais_form" placeholder="Opcional" autocomplete="off" size="sm"></b-form-input>
                        <!-- <select class="form-control form-control-sm" v-model="pais" required>
                            <option value="">Selecciona</option>
                            <option value="ecuador">Ecuador</option>
                            <option value="guatemala">Guatemala</option>
                            <option value="mexico">México</option>
                            <option value="usa">USA</option>
                        </select> -->
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
import { minix } from '../../functions/alertas'


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
            apellidos: '',
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

            if (this.nombre.length > 20) {

                minix({icon: 'info', mensaje: 'Nombre no puede ser mayor a 20 caracteres', tiempo: 3000})
                document.getElementById('nombre_form').focus()

            }else if(this.apellidos.length > 20){
                minix({icon: 'info', mensaje: 'Apellidos no puede ser mayor a 20 caracteres', tiempo: 3000})
                document.getElementById('apellidos_form').focus()
                
            }else if(this.nombre_iglesia.length > 20){
                minix({icon: 'info', mensaje: 'Nombre iglesia no puede ser mayor a 20 caracteres', tiempo: 3000})
                document.getElementById('nombre_iglesia_form').focus()
            }else if(this.pais.length > 20){
                minix({icon: 'info', mensaje: 'País no puede ser mayor a 21 caracteres', tiempo: 3000})
                document.getElementById('pais_form').focus()
            }else{

                let f = {
                    api: 'pastores',
                    pull: false,
                    formulario: {
                        dpi: this.cui.trim(),
                        nombre: this.nombre.toUpperCase().trim(),
                        apellidos: this.apellidos.toUpperCase().trim(),
                        cargo: this.cargo.toUpperCase().trim(),
                        nombre_iglesia: this.nombre_iglesia.toUpperCase().trim(),
                        telefono: this.telefono.trim(),
                        correo: this.correo.trim(),
                        pais: this.pais.toUpperCase().trim(),
                        area: this.area.trim(),
                        region: this.region.toUpperCase().trim()
                    }
                }
    
                    await this.saveData(f)
                    //await this.pullData({api: 'entrevistas'})
    
                    this.cui = ''
                    this.nombre = ''
                    this.apellidos = ''
                    this.cargo = ''
                    this.nombre_iglesia = ''
                    this.telefono = ''
                    this.correo = ''
                    this.pais = ''
                    this.area = ''
                    this.region = ''
                    
    
                    this.set_datos_personales('')
                    //this.$emit('comprobacion', 'modulo_1')
            }


            
        },
        save_storage(){

            let info = {
                cui: this.cui,
                nombre: this.nombre,
                apellidos: this.apellidos,
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
                this.apellidos = r.apellidos
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