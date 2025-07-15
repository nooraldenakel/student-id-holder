import React from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, SortAsc, SortDesc, Download } from 'lucide-react'
import { StudentFilters } from '../types/Student'

interface SearchAndFiltersProps {
  filters: StudentFilters
  onFiltersChange: (filters: StudentFilters) => void
  onExport: () => void
  totalStudents: number
  filteredStudents: number
}

const SearchAndFilters: React.FC<SearchAndFiltersProps> = ({
  filters,
  onFiltersChange,
  onExport,
  totalStudents,
  filteredStudents
}) => {
  const sections = [
        'جميع الأقسام',
        'الكيمياء',
        'اللغة الإنكليزية',
        'هندسة الحاسوب',
        'الفيزياء الصحية والعلاج الاشعاعي',
        'وقود وطاقة',
        'الامن السيراني',
        'صناعة الاسنان',
        'التربية البدنية و علوم الرياضة',
        'هندسة النفط',
        'الطب الحياتي',
        'هندسة الذكاء الاصطناعي'
    ]

  const studyTypes = ['الكل', 'الصباحي', 'المسائي']

  const printStatuses = ['الكل', 'مطبوع', 'غير مطبوع']

  const sortOptions = [
    { value: 'name', label: 'الاسم' },
    { value: 'section', label: 'القسم' },
    { value: 'studyType', label: 'نوع الدراسة' },
    { value: 'submissionDate', label: 'تاريخ التقديم' },
    { value: 'printStatus', label: 'حالة الطباعة' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
            البحث بالاسم
          </label>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => onFiltersChange({ ...filters, searchTerm: e.target.value })}
              placeholder="ابحث عن طالب بالاسم..."
              className="input-field pr-10 sm:pr-12 text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Section Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
            القسم
          </label>
          <div className="relative">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <select
              value={filters.section}
              onChange={(e) => onFiltersChange({ ...filters, section: e.target.value })}
              className="input-field pr-10 sm:pr-12 appearance-none text-sm sm:text-base"
            >
              {sections.map((section) => (
                <option key={section} value={section === 'جميع الاقسام' ? '' : section}>
                  {section}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Study Type Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
            نوع الدراسة
          </label>
          <div className="relative">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <select
              value={filters.studyType}
              onChange={(e) => onFiltersChange({ ...filters, studyType: e.target.value })}
              className="input-field pr-10 sm:pr-12 appearance-none text-sm sm:text-base"
            >
              {studyTypes.map((type) => (
                <option key={type} value={type === 'الكل' ? '' : type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Print Status Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
            حالة الطباعة
          </label>
          <div className="relative">
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <select
              value={filters.printStatus}
              onChange={(e) => onFiltersChange({ ...filters, printStatus: e.target.value })}
              className="input-field pr-10 sm:pr-12 appearance-none text-sm sm:text-base"
            >
              {printStatuses.map((status) => (
                <option key={status} value={status === 'الكل' ? '' : status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* Sort Options */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 sm:space-x-reverse">
          <div className="flex items-center space-x-2 space-x-reverse">
            <label className="text-sm font-semibold text-gray-700">ترتيب حسب:</label>
            <select
              value={filters.sortBy}
              onChange={(e) => onFiltersChange({ 
                ...filters, 
                sortBy: e.target.value as StudentFilters['sortBy']
              })}
              className="px-2 sm:px-3 py-1 sm:py-2 bg-white border border-gray-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => onFiltersChange({ 
              ...filters, 
                sortOrder: filters.sortOrder === 'time_asc' ? 'time_desc' : 'time_asc'
            })}
            className="p-1 sm:p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                 title={filters.sortOrder === 'time_asc' ? 'تصاعدي' : 'تنازلي'}
          >
                 {filters.sortOrder === 'time_asc' ? (
              <SortAsc className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            ) : (
              <SortDesc className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Export and Stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 sm:space-x-reverse w-full sm:w-auto">
          <div className="text-xs sm:text-sm text-gray-600 order-2 sm:order-1">
            عرض {filteredStudents} من أصل {totalStudents} طالب
          </div>
          
          <button
            onClick={onExport}
            className="btn-primary flex items-center space-x-2 space-x-reverse px-3 sm:px-4 py-2 text-xs sm:text-sm order-1 sm:order-2 w-full sm:w-auto justify-center"
          >
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>تصدير Excel</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default SearchAndFilters