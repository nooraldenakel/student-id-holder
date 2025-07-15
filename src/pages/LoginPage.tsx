import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Hash, LogIn, GraduationCap, BookOpen, Users } from 'lucide-react'

const LoginPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    examCode: ''
  })
  const [errors, setErrors] = useState({
    name: false,
    examCode: false
  })
  const [loading, setLoading] = useState(false)

  const validateName = (text: string) => {
    const arabicEnglishRegex = /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-zA-Z\s]+$/
    return text.trim() !== '' && arabicEnglishRegex.test(text)
  }

  const validateExamCode = (text: string) => {
    const numericRegex = /^\d+$/
    return text.trim() !== '' && numericRegex.test(text)
  }

  const isFormValid = () => {
    return validateName(formData.name) && validateExamCode(formData.examCode)
  }

  const handleInputChange = (field: string, value: string) => {
    if (field === 'examCode') {
      value = value.replace(/[^0-9]/g, '')
    }
    
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: false }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const nameValid = validateName(formData.name)
        const examCodeValid = validateExamCode(formData.examCode)

        setErrors({
            name: !nameValid,
            examCode: !examCodeValid
        })

        if (!nameValid || !examCodeValid) {
            return
        }

        setLoading(true)

        // Simulate API call
        try {
            const encodedName = encodeURIComponent(formData.name.trim())
            const url = `https://student-id-info-back-production.up.railway.app/student/login?examCode=${formData.examCode}&name=${encodedName}`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                const errorText = await response.text()
                throw new Error(errorText || 'Login Failed')
            }
            const result = await response.json()
            //console.log('Login API Response:', result)

            const { accessToken, refreshToken } = result;


            if (accessToken && refreshToken) {
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("studentName", formData.name.trim());
                localStorage.setItem("examCode", formData.examCode);
                navigate('/student-info', {
                    state: {
                        accessToken,
                        refreshToken,
                        studentName: formData.name.trim(),
                        examCode: formData.examCode
                    }
                })
            } else {
                throw new Error('Missing token in response ❌')
            }
        } catch (error) {
            console.error('Error calling API:', error)
            alert('فشل تسجيل الدخول! تأكد من الاسم والرقم الامتحاني')
        } finally {
            setLoading(false)
        }
    }

   return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-40 left-40 w-60 h-60 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
                {/* Right Side - Branding */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center lg:text-right order-2 lg:order-1"
                >
                    <div className="mb-8">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-2xl"
                        >
                            <GraduationCap className="w-10 h-10 text-white" />
                        </motion.div>

                        <h1 className="text-5xl lg:text-6xl font-bold mb-4">
                            <span className="gradient-text">منصــة</span>
                            <br />
                            <span className="text-gray-800">الهوية الجامعية</span>
                        </h1>

                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            منصــة حديثة وآمنة وسهلة الاستخدام للتقديم والحصول على الهوية الجامعية الرسمية
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-center"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <BookOpen className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">التحقق الذكي</h3>
                            <p className="text-sm text-gray-600">نظام التحقق من الصورة الشخصية للمتقدم</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="text-center"
                        >
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <Users className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">متعدد اللغات</h3>
                            <p className="text-sm text-gray-600">دعم اللغة العربية والإنجليزية</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-center"
                        >
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                                <LogIn className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-1">وصول آمن</h3>
                            <p className="text-sm text-gray-600">منصة آمنة وموثوقة</p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Left Side - Login Form */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-md mx-auto order-1 lg:order-2"
                >
                    <div className="glass-card rounded-3xl p-8 shadow-2xl">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">أهلاً بك</h2>
                            <p className="text-gray-600">أدخل البياناتك المطلوبة لتقديم الحصول على الهوية</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                                    اسم الطالب
                                </label>
                                <div className="relative">
                                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                        placeholder="أدخل اسمك الكامل (عربي أو إنجليزي)"
                                        className={`input-field pr-12 ${errors.name ? 'border-red-500 bg-red-50' : ''}`}
                                    />
                                </div>
                                {errors.name && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-sm mt-2 text-right"
                                    >
                                        الاسم مطلوب ويجب أن يحتوي على أحرف عربية أو إنجليزية فقط
                                    </motion.p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2 text-right">
                                    الرقم الامتحاني
                                </label>
                                <div className="relative">
                                    <Hash className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={formData.examCode}
                                        onChange={(e) => handleInputChange('examCode', e.target.value)}
                                        placeholder="أدخل الرقم الامتحاني الخاص بك (أرقام فقط)"
                                        className={`input-field pr-12 ${errors.examCode ? 'border-red-500 bg-red-50' : ''}`}
                                    />
                                </div>
                                {errors.examCode && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-sm mt-2 text-right"
                                    >
                                        الرقم الامتحاني مطلوب ويجب أن يحتوي على أرقام فقط
                                    </motion.p>
                                )}
                            </div>

                            <motion.button
                                type="submit"
                                disabled={!isFormValid() || loading}
                                className="btn-primary w-full flex items-center justify-center space-x-2"
                                whileHover={{ scale: isFormValid() && !loading ? 1.02 : 1 }}
                                whileTap={{ scale: isFormValid() && !loading ? 0.98 : 1 }}
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <>
                                        <span>الدخول الى المنصــة</span>
                                        <LogIn className="w-5 h-5 rtl-flip" />
                                    </>
                                )}
                            </motion.button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-center text-sm text-gray-500">
                                تحتاج مساعدة؟ تواصل مع مدير الموقع
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default LoginPage