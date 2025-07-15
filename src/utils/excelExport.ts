import * as XLSX from 'xlsx'
import { Student } from '../types/Student'

export const exportToExcel = (students: Student[], filename: string = 'students_data') => {
  // Prepare data for Excel export
  const excelData = students.map((student, index) => ({
      'الرقم التسلسلي': index + 1,
      'اسم الطالب': student.name ?? '',
      'القسم': student.section ?? '',
      'نوع الدراسة': student.studyType ?? '',
      'سنة الميلاد': student.birthDate ?? '',
      'رقم الهوية': student.symbol ?? '',
      'تاريخ التقديم': student.time ?? '',
      'الرقم الامتحاني': student.examNumber ?? '',
      'رابط الصورة': student.imageUrl ?? '',
  }))

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new()
  const worksheet = XLSX.utils.json_to_sheet(excelData)

  // Set column widths
  const columnWidths = [
      { wch: 8 },  // الرقم التسلسلي
      { wch: 20 }, // اسم الطالب
      { wch: 18 }, // القسم
      { wch: 12 }, // نوع الدراسة
      { wch: 20 }, // تاريخ الميلاد
      { wch: 12 },  // رقم الهوية
      { wch: 15 }, // تاريخ التقديم
      { wch: 15 }, // الرقم الامتحاني
      { wch: 30 }, // رابط الصورة
  ]
  
  worksheet['!cols'] = columnWidths

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'بيانات الطلاب')

  // Generate filename with current date
  const currentDate = new Date().toISOString().split('T')[0]
  const finalFilename = `${filename}_${currentDate}.xlsx`

  // Save file
  XLSX.writeFile(workbook, finalFilename)
}