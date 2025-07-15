export interface Student {
  id: string
  name: string
  examNumber: string
  section: string
  studyType: string
  birthDate: string
  imageUrl: string
  time: string
  symbol: string
  isPrinted: boolean
}

export interface StudentFilters {
  searchTerm: string
  section: string
  studyType: string
  printStatus: string
  sortBy: 'name' | 'section' | 'studyType' | 'time' | 'printStatus'
  sortOrder: 'name_asc' | 'name_desc' | 'time_asc' | 'time_desc'
}