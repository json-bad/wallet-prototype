import SwiftUI

struct GlassCard: ViewModifier {
    var cornerRadius: CGFloat = 28

    func body(content: Content) -> some View {
        content
            .background(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: cornerRadius, style: .continuous))
            .overlay {
                RoundedRectangle(cornerRadius: cornerRadius, style: .continuous)
                    .stroke(.white.opacity(0.18), lineWidth: 1)
            }
            .shadow(color: .black.opacity(0.22), radius: 18, y: 10)
    }
}

extension View {
    func glassCard(cornerRadius: CGFloat = 28) -> some View {
        modifier(GlassCard(cornerRadius: cornerRadius))
    }
}

struct GradientBackdrop: View {
    var body: some View {
        ZStack {
            Color(red: 0.035, green: 0.047, blue: 0.105)
            Circle()
                .fill(Color.cyan.opacity(0.20))
                .frame(width: 370)
                .blur(radius: 60)
                .offset(x: -160, y: -390)
            Circle()
                .fill(Color.purple.opacity(0.22))
                .frame(width: 340)
                .blur(radius: 75)
                .offset(x: 180, y: 260)
            LinearGradient(colors: [.clear, .black.opacity(0.30)], startPoint: .top, endPoint: .bottom)
        }
        .ignoresSafeArea()
    }
}
