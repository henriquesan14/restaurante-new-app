import { Component, ViewChild, inject } from '@angular/core';
import { FormUsuarioComponent } from '../form-usuario/form-usuario.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../../../shared/services/usuarios.service';
import { Router } from '@angular/router';
import { BtnVoltarComponent } from '../../../shared/components/btn-voltar/btn-voltar.component';
import { BtnNovoComponent } from '../../../shared/components/btn-novo/btn-novo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalFormGrupoComponent } from '../modal-form-grupo/modal-form-grupo.component';
import { HasRoleDirective } from '../../../shared/directives/has-role.directive';
import { DataService } from '../../../shared/services/data-service';
import { Avatar } from '../../../core/models/avatar.interface';
import { Usuario } from '../../../core/models/usuario.interface';
import { ImageCompressorService } from '../../../shared/services/image-compressor.service';

@Component({
  selector: 'app-cadastro-usuarios',
  standalone: true,
  imports: [FormUsuarioComponent, NgxSpinnerModule, BtnVoltarComponent, BtnNovoComponent, HasRoleDirective],
  templateUrl: './cadastro-usuarios.component.html',
  styleUrl: './cadastro-usuarios.component.css'
})
export class CadastroUsuariosComponent {

  private modalService = inject(NgbModal);
  @ViewChild(FormUsuarioComponent) formUsuario!: FormUsuarioComponent;

  avatar!: Avatar;

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private usuarioService: UsuariosService,
    private dataService: DataService, private router: Router, private imageCompressorService: ImageCompressorService){
  }

  async submit(event: Usuario){
    this.spinner.show();
    this.avatar = event.avatar;
    if(event.avatar && event.avatar.file){
      const compressedFile = await this.imageCompressorService.compressImage(this.avatar.file, 800, 800, 0.8);
      const compressedFileObj = new File([compressedFile], this.avatar.file.name, {
        type: this.avatar.file.type,
        lastModified: Date.now()
      });
      this.dataService.pushFileToStorage(compressedFileObj, "avatars").subscribe({
        next: (res) => {
          this.avatar.url = res.url;
          this.avatar.path = res.path;
          this.cadastrarUsuario(event);
        },
        error: () => {
          this.spinner.hide();
          this.toastr.error('Erro ao fazer upload da imagem', 'Error');
        },
        complete: () => {
          this.spinner.hide();
        }
      });
      return;
    }
    this.cadastrarUsuario(event);
  }

  cadastrarUsuario(event: any){
    this.usuarioService.addUsuario(event).subscribe({
      next: () => {
        this.toastr.success('Usuário cadastrado!', 'Sucesso!');
        this.router.navigateByUrl('app/usuarios')
      },
      error: async () => {
        if(event.avatar && event.avatar.file){
          await this.deleteFile();
        }
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  async deleteFile(){
      await this.dataService.deleteFile(this.avatar.path!);
  }

  openNovoGrupo() {
		const modalRef = this.modalService.open(ModalFormGrupoComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.submitEvent.subscribe((e: any) => {
      this.formUsuario.getGrupos(null);
    });
	}
}
