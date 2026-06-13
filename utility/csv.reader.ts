import * as fs from 'fs';
import * as path from 'path';

export function csvReader(filename: string): Record<string, string>[] {
    const data: string = fs.readFileSync(path.resolve(__dirname, '../data/csv/', filename), 'utf-8');
    const lines: string[] = data.split('\n');
    const result: Record<string, string>[] = [];
    const headers: string[] = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
        const obj: Record<string, string> = {};
        const currentLine: string[] = lines[i].split(',');

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentLine[j]?.trim() ?? '';
        }
        result.push(obj);
    }

    return result;
}