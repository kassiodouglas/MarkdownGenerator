#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

// Converte para StudlyCase (CardsCreate)
const studly = (str) =>
  str
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\s+/g, "");

// Converte para kebab-case (cards-create)
const kebab = (str) =>
  str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase();

// Gera o nome do arquivo (cards-create.api.ts)
const resolveFileName = (name, type) => {
  const fileBase = kebab(name); // cards-create
  return `${fileBase}.${type.toLowerCase()}.ts`;
};

const createDomainFile = async () => {
  const [, , command, domainArg, typeArg, nameArg] = process.argv;

  if (command !== "make:domain:file") {
    console.error("❌ Comando inválido. Use: make:domain:file");
    process.exit(1);
  }

  const domain = studly(domainArg); // Ex: Cards
  const type = studly(typeArg); // Ex: Page
  const nameParts = nameArg.split(/[\/\\]/); // divide por / ou \
  const fileName = nameParts.pop(); // último é o nome do arquivo
  const subDirs = nameParts.map(kebab).join(path.sep); // resto é o caminho
  const name = studly(fileName);
  const fileBase = kebab(fileName);

  let basePath = "";
  if (domain.toLowerCase() == "shared") {
    basePath = path.join("src", "app", "Shared", `${type}s`, subDirs);
  } else {
    basePath = path.join("src", "app", "domains", domain, `${type}s`, subDirs);
  }

  if (["Modal", "Page", "Panel"].includes(type)) {
    basePath = path.join(
      "src",
      "app",
      "domains",
      domain,
      `${type}s`,
      subDirs,
      `${fileBase}`
    );
  }

  const fileTsPath = path.join(
    basePath,
    `${fileBase}.${type.toLowerCase()}.ts`
  );
  const fileHtmlPath = path.join(
    basePath,
    `${fileBase}.${type.toLowerCase()}.html`
  );
  const stubTsPath = path.join("stubs", "domain", `${type}.stub`);
  const stubHtmlPath = path.join("stubs", "domain", `${type}.html.stub`);

  if (!fs.existsSync(basePath)) {
    console.log(basePath)
    fs.mkdirSync(basePath, { recursive: true });
  }

  // Criação do .ts
  if (!fs.existsSync(stubTsPath)) {
    console.error(`❌ Stub TS não encontrado: ${stubTsPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(fileTsPath)) {
    const tsContent = fs
      .readFileSync(stubTsPath, "utf-8")
      .replace(/{{ name }}/g, name)
      .replace(/{{ domain }}/g, domain)
      .replace(/{{ kebab }}/g, fileBase);
    fs.writeFileSync(fileTsPath, tsContent);
    console.log(`✅ Arquivo criado: ${fileTsPath}`);
  } else {
    console.warn(`⚠️ Arquivo já existe: ${fileTsPath}`);
  }

  // Se for tipo page, cria o .html também
  if (["page", "modal", "panel"].includes(type.toLowerCase())) {
    if (!fs.existsSync(stubHtmlPath)) {
      console.error(`❌ Stub HTML não encontrado: ${stubHtmlPath}`);
      return;
    }

    if (!fs.existsSync(fileHtmlPath)) {
      const htmlContent = fs
        .readFileSync(stubHtmlPath, "utf-8")
        .replace(/{{ name }}/g, name)
        .replace(/{{ domain }}/g, domain)
        .replace(/{{ kebab }}/g, fileBase);
      fs.writeFileSync(fileHtmlPath, htmlContent);
      console.log(`✅ HTML criado: ${fileHtmlPath}`);
    } else {
      console.warn(`⚠️ HTML já existe: ${fileHtmlPath}`);
    }
  }
};

createDomainFile();
