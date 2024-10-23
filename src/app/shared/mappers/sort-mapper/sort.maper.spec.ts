import { SortMapper } from './sort.mapper';
import { SortBy } from '../../enums/sort-by.enum';
import { SortDirection } from '../../enums/sort-direction.enum';

describe('SortMapper', () => {
  describe('mapSortBy', () => {
    it('debería mapear "name" a SortBy.NAME', () => {
      const result = SortMapper.mapSortBy('name');
      expect(result).toBe(SortBy.NAME);
    });

    it('debería devolver SortBy.NAME para valores desconocidos', () => {
      const result = SortMapper.mapSortBy('unknownValue');
      expect(result).toBe(SortBy.NAME);
    });

    it('debería mapear "NAME" a SortBy.NAME (case insensitive)', () => {
      const result = SortMapper.mapSortBy('NAME');
      expect(result).toBe(SortBy.NAME);
    });
  });

  describe('mapSortDirection', () => {
    it('debería mapear "asc" a SortDirection.ASC', () => {
      const result = SortMapper.mapSortDirection('asc');
      expect(result).toBe(SortDirection.ASC);
    });

    it('debería mapear "desc" a SortDirection.DESC', () => {
      const result = SortMapper.mapSortDirection('desc');
      expect(result).toBe(SortDirection.DESC);
    });

    it('debería devolver SortDirection.ASC para valores desconocidos', () => {
      const result = SortMapper.mapSortDirection('unknownValue');
      expect(result).toBe(SortDirection.ASC);
    });

    it('debería mapear "ASC" a SortDirection.ASC (case insensitive)', () => {
      const result = SortMapper.mapSortDirection('ASC');
      expect(result).toBe(SortDirection.ASC);
    });

    it('debería mapear "DESC" a SortDirection.DESC (case insensitive)', () => {
      const result = SortMapper.mapSortDirection('DESC');
      expect(result).toBe(SortDirection.DESC);
    });
  });
});
