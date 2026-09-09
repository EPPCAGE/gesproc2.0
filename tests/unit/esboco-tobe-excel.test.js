import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const html = readFileSync(new URL('../../processos.html', import.meta.url), 'utf8');

describe('exportação Excel do Esboço TO BE', () => {
  it('exibe o botão de exportação na etapa TO BE', () => {
    const inicio = html.indexOf("esboco_tobe:{titulo:'Esboço TO BE'");
    const fim = html.indexOf("det_valid_tobe:", inicio);
    const secao = html.slice(inicio, fim);

    expect(secao).toContain('onclick="exportarEtapasToBeXlsx()"');
    expect(secao).toContain('⬇ Exportar Excel');
  });

  it('exporta etapas TO BE com aba e arquivo próprios', () => {
    const inicio = html.indexOf("function exportarEtapasXlsx(which='asis')");
    const fim = html.indexOf('function _renderVinculoGwField', inicio);
    const exportacao = html.slice(inicio, fim);

    expect(exportacao).toContain("isTobe?'etapas_proc_tobe':'etapas_proc'");
    expect(exportacao).toContain("isTobe?'TO BE':'AS IS'");
    expect(exportacao).toContain("'_etapas_tobe.xlsx'");
    expect(exportacao).toContain("function exportarEtapasToBeXlsx(){return exportarEtapasXlsx('tobe');}");
  });
});
