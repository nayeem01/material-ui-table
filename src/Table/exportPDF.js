import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

const exportPDF = (data, title, headers) => {
  const unit = 'pt';
  const size = 'A4';
  const orientation = 'portrait';

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);

  doc.setFontSize(12);

  const currentData = moment().format('MM-DD-YYYY');

  const generatedFileName = () => {
    const transforTitle = title.replace(/\s+/g, '-').toLowerCase();
    return `${transforTitle}-${currentData}.pdf`;
  };

  let content = {
    startY: 50,
    head: [headers],
    body: data,
  };

  doc.text(title, marginLeft, 40);
  doc.autoTable(content);
  doc.save(generatedFileName());
};

export default exportPDF;
