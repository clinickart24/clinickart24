import * as XLSX from 'xlsx';

/**
 * Export data to Excel file
 * @param {Array} data - Array of objects to export
 * @param {string} filename - Name of the file (without extension)
 * @param {string} sheetName - Name of the Excel sheet
 */
export const exportToExcel = (data, filename = 'export', sheetName = 'Sheet1') => {
  try {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    
    // Convert data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);
    
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    // Generate Excel file and trigger download
    XLSX.writeFile(workbook, `${filename}.xlsx`);
    
    console.log(`Excel file "${filename}.xlsx" exported successfully`);
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    alert('Failed to export Excel file. Please try again.');
  }
};

/**
 * Export data to CSV file
 * @param {Array} data - Array of objects to export
 * @param {string} filename - Name of the file (without extension)
 */
export const exportToCSV = (data, filename = 'export') => {
  try {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    // Get headers from the first object
    const headers = Object.keys(data[0]);
    
    // Create CSV content
    const csvContent = [
      // Headers row
      headers.join(','),
      // Data rows
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Handle values that might contain commas or quotes
          if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value || '';
        }).join(',')
      )
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    
    console.log(`CSV file "${filename}.csv" exported successfully`);
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    alert('Failed to export CSV file. Please try again.');
  }
};

/**
 * Format data for export by cleaning up complex objects
 * @param {Array} data - Raw data array
 * @param {Object} fieldMapping - Optional field mapping for renaming columns
 */
export const formatDataForExport = (data, fieldMapping = {}) => {
  return data.map(item => {
    const formattedItem = {};
    
    Object.keys(item).forEach(key => {
      const mappedKey = fieldMapping[key] || key;
      let value = item[key];
      
      // Handle different data types
      if (value === null || value === undefined) {
        value = '';
      } else if (typeof value === 'object') {
        // Convert objects to string representation
        value = JSON.stringify(value);
      } else if (typeof value === 'boolean') {
        value = value ? 'Yes' : 'No';
      } else if (value instanceof Date) {
        value = value.toLocaleDateString();
      }
      
      formattedItem[mappedKey] = value;
    });
    
    return formattedItem;
  });
};

/**
 * Export table data with custom formatting
 * @param {Array} data - Table data
 * @param {Array} columns - Table column definitions
 * @param {string} filename - Export filename
 * @param {string} format - Export format ('excel' or 'csv')
 */
export const exportTableData = (data, columns, filename, format = 'excel') => {
  try {
    // Create field mapping from column definitions
    const fieldMapping = {};
    columns.forEach(col => {
      if (col.accessor && col.Header) {
        fieldMapping[col.accessor] = col.Header;
      }
    });

    // Format data for export
    const exportData = data.map(row => {
      const exportRow = {};
      columns.forEach(col => {
        if (col.accessor) {
          const key = col.Header || col.accessor;
          let value = row[col.accessor];
          
          // Handle special formatting
          if (typeof value === 'boolean') {
            value = value ? 'Active' : 'Inactive';
          } else if (value === null || value === undefined) {
            value = '';
          } else if (typeof value === 'object') {
            value = JSON.stringify(value);
          }
          
          exportRow[key] = value;
        }
      });
      return exportRow;
    });

    // Export based on format
    if (format.toLowerCase() === 'csv') {
      exportToCSV(exportData, filename);
    } else {
      exportToExcel(exportData, filename);
    }
  } catch (error) {
    console.error('Error exporting table data:', error);
    alert('Failed to export data. Please try again.');
  }
};

// Export utility object for easy importing
export const ExportUtils = {
  exportToExcel,
  exportToCSV,
  formatDataForExport,
  exportTableData
};

export default ExportUtils;
