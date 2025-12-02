import React, { useState, useRef } from 'react';

const ExcelToJsonConverter = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const fileInputRef = useRef(null);

  // Dynamically load SheetJS from CDN
  const loadSheetJS = () => {
    return new Promise((resolve, reject) => {
      if (window.XLSX) return resolve(window.XLSX);
      
      const script = document.createElement('script');
      script.src = 'https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js';
      script.onload = () => resolve(window.XLSX);
      script.onerror = () => reject(new Error('Failed to load SheetJS'));
      document.head.appendChild(script);
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus(`Selected: ${selectedFile.name}`);
    }
  };

  const processExcel = async () => {
    if (!file) {
      setStatus('⚠️ Please select an Excel file first.');
      return;
    }

    try {
      setStatus('⚙️ Loading SheetJS...');
      const XLSX = await loadSheetJS();

      setStatus('📤 Reading Excel file...');
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });

          // Get Sheet1 (student info) and Sheet3 (scores)
          const sheet1 = workbook.Sheets['Sheet1'];
          const sheet3 = workbook.Sheets['Sheet3'];

          if (!sheet1 || !sheet3) {
            throw new Error('Required sheets "Sheet1" or "Sheet3" not found.');
          }

          setStatus('📊 Parsing data...');
          
          // Parse Sheet1 → student info
          const studentRows = XLSX.utils.sheet_to_json(sheet1, { header: 1 });
          // Skip header row (index 0), start from 1
          const students = {};
          for (let i = 1; i < studentRows.length; i++) {
            const row = studentRows[i];
            if (!row || row.length < 3) continue;
            
            let regNo = String(row[0]).trim();
            const name = String(row[1] || '').trim().replace(/\s+/g, ' ');
            const college = String(row[2] || '').trim().replace(/\s+/g, ' ');
            
            // Clean regNo (remove non-digits)
            regNo = regNo.replace(/\D/g, '');
            if (!regNo || !name) continue;

            students[regNo] = { name, college, scores: null };
          }

          // Parse Sheet3 → scores
          const scoreRows = XLSX.utils.sheet_to_json(sheet3, { header: 1 });
          for (let i = 1; i < scoreRows.length; i++) {
            const row = scoreRows[i];
            if (!row || row.length < 9) continue;

            let regNo = String(row[0]).trim().replace(/\D/g, '');
            if (!regNo || !students[regNo]) continue;

            const s1 = Number(row[1]) || 0;
            const s2 = Number(row[2]) || 0;
            const s3 = Number(row[3]) || 0;
            const s4 = Number(row[4]) || 0;
            const s5 = Number(row[5]) || 0;
            const s6 = Number(row[6]) || 0;
            const s7 = Number(row[7]) || 0;
            const total = Number(row[8]) || (s1 + s2 + s3 + s4 + s5 + s6 + s7);

            students[regNo].scores = {
              s1,
              s2,
              s3,
              s4,
              s5,
              s6,
              s7,
              total: parseFloat(total.toFixed(1))
            };
          }

          // Remove students without scores
          Object.keys(students).forEach(regNo => {
            if (!students[regNo].scores) {
              delete students[regNo];
            }
          });

          const finalData = {
            students
          };

          setJsonData(finalData);
          setStatus(`✅ Success! Processed ${Object.keys(students).length} students.`);
        } catch (err) {
          console.error(err);
          setStatus(`❌ Error: ${err.message}`);
        }
      };
      reader.readAsArrayBuffer(file);
    } catch (err) {
      setStatus(`❌ ${err.message}`);
    }
  };

  const downloadJs = () => {
    if (!jsonData) return;
    
    const jsContent = `const data = ${JSON.stringify(jsonData, null, 2)};\n\nexport default data;`;
    const blob = new Blob([jsContent], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'results.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Excel → JSON Converter</h2>
        <p className="text-gray-600 mb-6">
          Upload <code>TICKET FINAL.xlsx</code> to generate <code>results.js</code>
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Excel File (Sheet1 + Sheet3)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={triggerFileSelect}
              className="w-full py-2.5 px-4 text-left border border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {file ? `📄 ${file.name}` : '📎 Click to select Excel file'}
            </button>
          </div>

          <div>
            <button
              onClick={processExcel}
              disabled={!file}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              🚀 Convert to JSON
            </button>
          </div>

          {status && (
            <div className={`p-3 rounded-lg text-sm ${
              status.includes('✅') ? 'bg-green-50 text-green-700' :
              status.includes('⚠️') ? 'bg-yellow-50 text-yellow-700' :
              status.includes('❌') ? 'bg-red-50 text-red-700' :
              'bg-blue-50 text-blue-700'
            }`}>
              {status}
            </div>
          )}

          {jsonData && (
            <div className="pt-4">
              <button
                onClick={downloadJs}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg flex items-center justify-center gap-2"
              >
                💾 Download results.js
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 text-xs text-gray-500 border-t pt-4">
          <p>✅ Combines <strong>Sheet1</strong> (Reg.No, Name, College) and <strong>Sheet3</strong> (Scores)</p>
          <p>✅ Output format: <code>export default {`{ students: { "10001": { name, college, scores: { s1..s7, total } } } }`}</code></p>
        </div>
      </div>
    </div>
  );
};

export default ExcelToJsonConverter;