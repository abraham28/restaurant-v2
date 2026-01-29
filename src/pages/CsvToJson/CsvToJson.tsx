import React, { useState, useCallback, useRef, useMemo } from 'react';
import Button from 'atomic-components/Button/Button';
import Textarea from 'atomic-components/Textarea/Textarea';
import Checkbox from 'atomic-components/Checkbox/Checkbox';
import { csvToObjects } from 'utils/csvUtils';
import styles from './CsvToJson.module.scss';

function CsvToJson() {
  const [csvInput, setCsvInput] = useState('');
  const [jsonData, setJsonData] = useState<Record<string, string>[] | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isMinified, setIsMinified] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const jsonOutput = useMemo(() => {
    if (!jsonData) return '';
    return isMinified
      ? JSON.stringify(jsonData)
      : JSON.stringify(jsonData, null, 2);
  }, [jsonData, isMinified]);

  const handleConvert = useCallback(() => {
    setError(null);
    setJsonData(null);

    if (!csvInput.trim()) {
      setError('Please enter CSV data');
      return;
    }

    try {
      const result = csvToObjects(csvInput);

      if (result.errors.length > 0) {
        setError(result.errors.join('\n'));
        return;
      }

      if (result.data.length === 0) {
        setError('No data found in CSV');
        return;
      }

      setJsonData(result.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to convert CSV to JSON';
      setError(errorMessage);
    }
  }, [csvInput]);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file type
      const validTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'text/plain',
        'application/csv',
      ];
      const isValidType =
        validTypes.includes(file.type) ||
        file.name.toLowerCase().endsWith('.csv');

      if (!isValidType) {
        setError('Please select a valid CSV file.');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setCsvInput(text);
        setFileName(file.name);
        setError(null);
        setJsonData(null);
      };
      reader.onerror = () => {
        setError('Failed to read the CSV file.');
      };
      reader.readAsText(file);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [],
  );

  const handleFileButtonClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleClear = useCallback(() => {
    setCsvInput('');
    setJsonData(null);
    setError(null);
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, []);

  const handleCopyJson = useCallback(() => {
    if (jsonOutput) {
      void navigator.clipboard.writeText(jsonOutput);
    }
  }, [jsonOutput]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>CSV to JSON Converter</h1>
        <p className={styles.description}>
          Upload a CSV file or paste your CSV data below and convert it to JSON
          format
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.inputSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>CSV Input</h2>
            <div className={styles.headerActions}>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,text/csv,application/vnd.ms-excel"
                onChange={handleFileUpload}
                className={styles.fileInput}
                aria-label="Upload CSV file"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={handleFileButtonClick}
              >
                Upload File
              </Button>
              <Button variant="outline" size="sm" onClick={handleClear}>
                Clear
              </Button>
            </div>
          </div>
          {fileName && (
            <div className={styles.fileName}>
              <span className={styles.fileNameLabel}>File:</span>
              <span className={styles.fileNameValue}>{fileName}</span>
            </div>
          )}
          <Textarea
            value={csvInput}
            onChange={setCsvInput}
            placeholder="Paste your CSV data here or upload a CSV file..."
            rows={15}
            className={styles.textarea}
          />
        </div>

        <div className={styles.buttonSection}>
          <Button variant="primary" onClick={handleConvert}>
            Convert to JSON
          </Button>
        </div>

        <div className={styles.outputSection}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>JSON Output</h2>
            <div className={styles.outputActions}>
              {jsonData && (
                <Checkbox
                  checked={isMinified}
                  onChange={setIsMinified}
                  label="Minified"
                  className={styles.minifiedCheckbox}
                />
              )}
              {jsonOutput && (
                <Button variant="outline" size="sm" onClick={handleCopyJson}>
                  Copy JSON
                </Button>
              )}
            </div>
          </div>
          {error ? (
            <div className={styles.errorState}>
              <p className={styles.errorText}>{error}</p>
            </div>
          ) : (
            <Textarea
              value={jsonOutput}
              onChange={() => {
                // Output is read-only, computed from jsonData
              }}
              placeholder="JSON output will appear here..."
              rows={15}
              className={styles.textarea}
              disabled={!jsonOutput}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CsvToJson;
