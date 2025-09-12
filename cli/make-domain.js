#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs/promises');
const path = require('path');

const studly = str => str.replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase());
const kebab = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

const baseAppPath = path.join(__dirname, '..', 'src', 'app', 'Domains');

const defaultFolders = ['Actions', 'Services','Apis','Pages', 'Components','Dtos','Enums'];

const createDir = async dir => {
  try {
    await fs.mkdir(dir, { recursive: true });
    console.log(`Criado: ${dir}`);
  } catch (err) {
    console.error(`Erro ao criar ${dir}:`, err.message);
  }
};

const createFromStub = async (stubName, outputPath, name) => {
  try {
    await fs.access(outputPath);
    console.warn(`Arquivo já existe: ${outputPath}`);
  } catch {
    const stubPath = path.join(__dirname, '..', 'stubs', 'domain', `${stubName}.stub`);
    try {
      let content = await fs.readFile(stubPath, 'utf-8');
      content = content.replace(/{{ name }}/g, name).replace(/{{ kebab }}/g, kebab(name));
      await fs.writeFile(outputPath, content);
      console.log(`Criado arquivo: ${outputPath}`);
    } catch (err) {
      console.error(`Erro com o stub ${stubName}:`, err.message);
    }
  }
};

program
  .command('make:domain <name>')
  .option('--with <folders...>', 'Pastas opcionais a serem criadas')
  .description('Gera a estrutura de pastas e arquivos para um domínio')
  .action(async (name, options) => {
    const domainName = studly(name);
    const basePath = path.join(baseAppPath, domainName);

    const folders = [...new Set([
      ...defaultFolders,
      ...(options.with || []).map(studly)
    ])];

    for (const folder of folders) {
      await createDir(path.join(basePath, folder));
    }

    // await createFromStub('Services', path.join(basePath, 'Services', `${domainName}Service.js`), domainName);
    await createFromStub('Routing',path.join(basePath, `${domainName.toLowerCase()}.routing.ts`),domainName);

    // await createFromStub('Readme', path.join(basePath, 'README.md'), domainName);
    console.log(`Domínio ${domainName} criado/atualizado com sucesso!`);
  });

program.parse(process.argv);
