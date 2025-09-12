const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Caminho do arquivo version.json (fora de src/, versão do projeto)
const versionFilePath = path.resolve(__dirname, '../../version.json');

// Se não existir, cria a primeira versão
if (!fs.existsSync(versionFilePath)) {
  fs.writeFileSync(versionFilePath, JSON.stringify({ version: "1.0.0.000" }, null, 2));
}

// Lê versão atual
let versionRaw = fs.readFileSync(versionFilePath, 'utf-8');
let version;

try {
  version = JSON.parse(versionRaw).version;
} catch (e) {
  console.error('❌ Não foi possível ler version.json');
  process.exit(1);
}

if (!/^\d+\.\d+\.\d+\.\d+$/.test(version)) {
  console.error(`❌ Versão inválida encontrada: ${version}`);
  process.exit(1);
}

// Quebra a versão em partes
let [major, minor, patch, build] = version.split('.').map(Number);

// Verifica se um v=X.Y.Z foi passado
const args = process.argv.slice(2);
const versionArg = args.find(arg => arg.startsWith('v='));

let newVersion = '';

if (versionArg) {
  const base = versionArg.split('=')[1];
  if (!/^\d+\.\d+\.\d+$/.test(base)) {
    console.error('❌ Formato inválido. Use: v=1.2.3');
    process.exit(1);
  }

  const [newMajor, newMinor, newPatch] = base.split('.').map(Number);

  // Validação para não aceitar versões menores
  const currentNumeric = major * 10000 + minor * 100 + patch;
  const inputNumeric = newMajor * 10000 + newMinor * 100 + newPatch;

  if (inputNumeric < currentNumeric) {
    console.error(`❌ A nova versão (${base}) não pode ser menor que a atual (${major}.${minor}.${patch})`);
    process.exit(1);
  }

  major = newMajor;
  minor = newMinor;
  patch = newPatch;
  build = 0;
}

const nextBuild = String(build + 1).padStart(3, '0');
newVersion = `${major}.${minor}.${patch}.${nextBuild}`;

// Grava no version.json principal
fs.writeFileSync(versionFilePath, JSON.stringify({ version: newVersion }, null, 2));
console.log(`✅ version.json atualizado para: ${newVersion}`);

// Também grava em public/version.json (para o Angular ou outro front)
const publicVersionFile = path.resolve(__dirname, '../public/version.json');
fs.writeFileSync(publicVersionFile, JSON.stringify({ version: newVersion }, null, 2));
console.log(`📦 Copiado para: public/version.json`);

// Roda o build do Angular
try {
  console.log('🚀 Executando build Angular...');
  execSync('npm run build:all', { stdio: 'inherit' });
} catch (err) {
  console.error('❌ Erro ao executar o build');
  process.exit(1);
}
