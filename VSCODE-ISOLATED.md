# Configuração do VS Code Isolado no Drive E:

## Como usar

Este projeto está configurado para rodar o VS Code completamente isolado no drive E:, sem usar armazenamento do C:.

### Iniciar o VS Code Isolado

Execute o script PowerShell:

```powershell
.\launch-vscode-isolated.ps1
```

### O que acontece

O script:
1. Cria diretórios locais no projeto para:
   - Dados do usuário (`.vscode-user-data`)
   - Extensões (`.vscode-extensions`)
   - Arquivos temporários (`.vscode-tmp`)

2. Define variáveis de ambiente:
   - `VSCODE_PORTABLE`: Modo portátil ativado
   - `VSCODE_APPDATA`: Dados no E:
   - `VSCODE_EXTENSIONS`: Extensões no E:
   - `TEMP/TMP/TMPDIR`: Temporários no E:

3. Inicia o VS Code com parâmetros:
   - `--user-data-dir`: Força dados no E:
   - `--extensions-dir`: Força extensões no E:

### Restaurar extensões do backup

Se quiser restaurar extensões do backup anterior:

```powershell
Copy-Item ".\VSCode_Backup_20251210_141100\.vscode\extensions\*" `
          ".\.vscode-extensions\" `
          -Recurse -Force
```

### Verificar isolamento

Para confirmar que nada está sendo salvo no C:, monitore as pastas:
- `C:\Users\Wander Pires\AppData\Roaming\Code` (não deve crescer)
- `C:\Users\Wander Pires\.vscode` (não deve crescer)

## Observações

- **Primeira execução**: Pode pedir para instalar extensões novamente
- **Performance**: Pode ser levemente mais lenta devido ao isolamento
- **Backup**: Os dados antigos estão em `VSCode_Backup_20251210_141100`
